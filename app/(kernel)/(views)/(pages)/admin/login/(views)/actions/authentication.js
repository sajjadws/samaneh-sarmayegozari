"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB";

export async function getAdminLoginStatus() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user?.id) {
		return { authenticated: false, isAdmin: false };
	}

	const user = await prismaDB.user.findUnique({
		where: { id: session.user.id },
		include: { role: true },
	});



	const isAdmin = user.role?.name === "superAdmin";
	return { authenticated: true, isAdmin };
}

export async function verifyAdminSession() {
	try {
		const status = await getAdminLoginStatus();
		
		return status.isAdmin
			? { ok: true }
			: { ok: false, message: "این حساب کاربری اجازه ورود به پنل مدیریت را ندارد." };
	} catch {
		return { ok: false, message: "بررسی دسترسی حساب ناموفق بود." };
	}
}
