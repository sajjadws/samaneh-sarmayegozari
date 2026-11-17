"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/authentication/auth";
import { getUserAccess } from "@/lib/rbac/services/get-user-access";

const ADMIN_ROLES = ["admin", "manager"];

export async function getAdminLoginStatus() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
        return { authenticated: false, isAdmin: false };
    }

    const access = await getUserAccess(session.user.id);
    // const isAdmin = access.isSuperAdmin || access.roles.some((role) => ADMIN_ROLES.includes(role.name));
    console.log("accessss", access);
    const isAdmin = access.roles.some((role) => ADMIN_ROLES.includes(role.name));
    console.log("isAdminnn", isAdmin);

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
