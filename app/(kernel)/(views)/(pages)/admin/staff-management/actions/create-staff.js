"use server";

import crypto from "node:crypto";
import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB";
import { authorizeAction, PERMISSIONS } from "@/lib/rbac";
import { authorizationResult } from "@/lib/rbac/errors/authorization-error";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const staffSchema = z.object({
	firstName: z.string().trim().min(1, "نام را وارد کنید").max(60),
	lastName: z.string().trim().min(1, "نام خانوادگی را وارد کنید").max(60),
	phoneNumber: z
		.string()
		.trim()
		.min(7)
		.max(24)
		.regex(/^[+()0-9۰-۹٠-٩\s-]+$/, "شماره موبایل معتبر نیست"),
	email: z.string().trim().email("ایمیل معتبر نیست").max(254),
	username: z.string().trim().min(3).max(254),
	password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد").max(128),
	roleId: z.string().trim().min(1, "نقش کارمند را انتخاب کنید"),
});

function normalizePhoneNumber(value) {
	const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
	const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
	return value
		.replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
		.replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
		.replace(/[\s()-]/g, "");
}

export async function createStaff(values) {
	let createdUserId = null;
	try {
		const actor = await authorizeAction({ permissions: [PERMISSIONS.USERS.CREATE, PERMISSIONS.ROLES.ASSIGN] });
		const parsed = staffSchema.safeParse(values);
		if (!parsed.success)
			return {
				ok: false,
				status: 400,
				message: parsed.error.issues[0]?.message || "اطلاعات واردشده معتبر نیست.",
				errors: parsed.error.flatten().fieldErrors,
			};
		const data = parsed.data;
		const email = data.email.toLowerCase();
		const username = data.username.trim();
		const fullName = [data.firstName, data.lastName].join(" ");
		const phoneNumber = normalizePhoneNumber(data.phoneNumber);
		if (!/^\+?\d{7,15}$/.test(phoneNumber)) return { ok: false, status: 400, message: "شماره موبایل معتبر نیست." };
		const role = await prismaDB.role.findUnique({
			where: { id: data.roleId },
			select: { id: true, isSuperAdmin: true },
		});
		if (!role || role.isSuperAdmin) return { ok: false, status: 400, message: "نقش انتخاب‌شده معتبر نیست." };
		const existing = await prismaDB.user.findFirst({
			where: { OR: [{ email }, { username }, { phoneNumber }] },
			select: { id: true },
		});
		if (existing)
			return { ok: false, status: 409, message: "ایمیل، نام کاربری یا شماره موبایل قبلاً ثبت شده است." };

		const created = await auth.api.signUpEmail({
			body: { email, username, name: fullName.trim(), password: data.password },
			headers: await headers(),
		});
		createdUserId = created?.user?.id;
		if (!createdUserId) throw new Error("Better Auth did not return a user id");
    
		await prismaDB.$transaction([
      prismaDB.user.update({
        where: { id: createdUserId },
				data: {
					phoneNumber,
					username,
					displayUsername: username,
				},
			}),

			prismaDB.userUtilities.create({
				data: {
					id: crypto.randomUUID(),
					firstName: data.firstName,
					lastName: data.lastName,
					userId: createdUserId,
				},
			}),

			prismaDB.userRole.create({
				data: {
					userId: createdUserId,
					roleId: role.id,
					assignedBy: actor.user.id,
				},
			}),
		]);
		revalidatePath("/admin/staff-management");
		return {
			ok: true,
			status: 201,
			data: { id: createdUserId },
			message: "کارمند با موفقیت ایجاد شد و نقش انتخاب‌شده به او اختصاص یافت.",
		};
	} catch (error) {
		if (createdUserId) {
			await prismaDB.user.delete({ where: { id: createdUserId } }).catch(() => {});
		}
		return (
			authorizationResult(error) ?? {
				ok: false,
				status: error?.status || (error?.code === "P2002" ? 409 : 500),
				message:
					error?.status === 409 || error?.code === "P2002"
						? "ایمیل، نام کاربری یا شماره موبایل قبلاً ثبت شده است."
						: "ایجاد کارمند انجام نشد. اطلاعات را بررسی کنید و دوباره تلاش کنید.",
			}
		);
	}
}
