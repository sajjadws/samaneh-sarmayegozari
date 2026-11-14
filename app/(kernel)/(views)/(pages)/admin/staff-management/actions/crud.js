"use server";

import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB";
import { routes } from "@/lib/routes/routes";
import { userSchema } from "@/lib/validation/user";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const getAllUsers = async (options = {}) => {
	const page = options?.page || 1;
	const perPage = options?.perPage || 10;
	const skip = (page - 1) * perPage;
	const take = perPage;
	const role = options?.role;

	const searchString = options.q;

	const searchFilter = {
		// AND: [
		// 	{
		// 		OR: [
		// 			{
		// 				title: {
		// 					contains: searchString,
		// 				},
		// 			},
		// 			{
		// 				description: {
		// 					contains: searchString,
		// 				},
		// 			},
		// 		],
		// 	},
		// ],
	};

	const where = searchFilter;

	const total = await prismaDB.user.count({ where });

	const data = await prismaDB.user.findMany({
		where,
		orderBy: {
			createdAt: "desc",
		},
		skip,
		take,
		select: {
			id: true,
			name: true,
			email: true,
			username: true,
			phoneNumber: true,
			status: true,
			createdAt: true,

			userUtilities: true,

			userRoles: {
				select: {
					role: {
						select: {
							id: true,
							title: true,

							permissions: {
								select: {
									roleId: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return {
		ok: true,
		status: 200,
		data: {
			data,
			total,
			page,
			perPage,
		},
		message: "داده ها ارسال شدند",
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
