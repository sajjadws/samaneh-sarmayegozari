"use server";

import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB";
import { routes } from "@/lib/routes/routes";
import { userSchema } from "@/lib/validation/user";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const getAllUsers = async (options = {}) => {
	const page = Number(options.page) || 1;
	const perPage = Number(options.perPage) || 10;
	const skip = (page - 1) * perPage;

	const { q, role, userStatus, bankAccountStatus } = options;

	const AND = [];

	if (q?.trim()) {
		const search = q.trim();

		const searchConditions = [
			{
				userUtilities: {
					is: {
						firstName: {
							contains: search,
						},
					},
				},
			},
			{
				userUtilities: {
					is: {
						lastName: {
							contains: search,
						},
					},
				},
			},
			{
				phoneNumber: {
					contains: search
				}
			},
		];

		for (let i = 1; i < search.length; i++) {
			const first = search.slice(0, i);
			const last = search.slice(i);

			searchConditions.push(
				{
					userUtilities: {
						is: {
							AND: [
								{
									firstName: {
										contains: first,
									},
								},
								{
									lastName: {
										contains: last,
									},
								},
							],
						},
					},
				},
				{
					userUtilities: {
						is: {
							AND: [
								{
									firstName: {
										contains: last,
									},
								},
								{
									lastName: {
										contains: first,
									},
								},
							],
						},
					},
				},
			);
		}

		AND.push({
			OR: searchConditions,
		});
	}

	if (userStatus) {
		AND.push({
			status: userStatus,
		});
	}

	if (bankAccountStatus) {
		AND.push({
			bankAccountStatus: bankAccountStatus,
		});
	}

	const where = AND.length ? { AND } : {};

	const [total, data] = await Promise.all([
		prismaDB.user.count({ where }),

		prismaDB.user.findMany({
			where,
			orderBy: {
				createdAt: "desc",
			},
			skip,
			take: perPage,
			select: {
				id: true,
				createdAt: true,
				status: true,
				phoneNumber: true,
				wallet: {
					select: {
						bankAccounts: {
							select: {
								id: true,
								status: true
							}
						}
					}
				},
				userUtilities: true,
				userRoles: {
					select: {
						role: true,
					},
				},
			},
		}),
	]);

	return {
		ok: true,
		status: 200,
		data: {
			data,
			total,
			page,
			perPage,
		},
		message: "داده‌ها ارسال شدند",
	};
};

export const getUserById = async (id) => {
	const data = await prismaDB.user.findUnique({
		where: {
			id,
		},
	});

	return {
		ok: true,
		status: 200,
		data,
		message: "داده ها ارسال شد.",
	};
};

export const createUser = async (values) => {
	const validateData = userSchema.safeParse(values);

	if (!validateData.success) {
		return {
			ok: false,
			status: 400,
			message: "فرمت دیتای ارسالی صحیح نمی‌باشد",
			errors: validateData.error.flatten().fieldErrors,
		};
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return {
			ok: false,
			status: 401,
			message: "برای ثبت پروژه ابتدا وارد حساب کاربری شوید",
		};
	}

	const { userStatus, categoryId, ...userData } = validateData.data;

	const data = await prismaDB.user.create({
		data: {
			...userData,
			status: userStatus ?? "PENDING",
			user: {
				connect: {
					id: session.user.id,
				},
			},
			category: {
				connect: {
					id: Number(categoryId),
				},
			},
		},
		include: {
			user: true,
			category: true,
		},
	});

	revalidatePath(routes.panel.users);

	return {
		ok: true,
		status: 201,
		data,
		message: "پروژه جدید اضافه شد",
	};
};

export const editUser = async (id, values) => {
	const validateData = userSchema.safeParse(values);

	if (!validateData.success) {
		return {
			ok: false,
			status: 400,
			message: "فرمت دیتای ارسالی صحیح نمی‌باشد",
			errors: validateData.error.flatten().fieldErrors,
		};
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return {
			ok: false,
			status: 401,
			message: "برای ویرایش پروژه ابتدا وارد حساب کاربری شوید",
		};
	}

	const { categoryId, userStatus, ...userData } = validateData.data;

	const data = await prismaDB.user.update({
		where: {
			id: Number(id),
		},
		data: {
			...userData,

			status: userStatus ?? "PENDING",

			category: {
				connect: {
					id: Number(categoryId),
				},
			},
		},
		include: {
			category: true,
		},
	});

	revalidatePath(routes.panel.users);
	revalidatePath(routes.panel.myUsers);

	return {
		ok: true,
		status: 200,
		data,
		message: "پروژه با موفقیت ویرایش شد",
	};
};

export const deleteUser = async (id) => {
	if (!id) {
		return {
			ok: false,
			status: 400,
			message: "id مورد نظر وجود ندارد.",
		};
	}

	const data = await prismaDB.user.delete({
		where: {
			id,
		},
	});

	revalidatePath(routes.panel.users);

	return {
		ok: true,
		status: 201,
		data,
		message: "کاربر مورد نظر حذف شد",
	};
};
