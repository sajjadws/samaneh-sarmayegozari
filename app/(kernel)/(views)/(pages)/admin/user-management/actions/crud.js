"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { authorizeAction, applyPermissionScope, PERMISSIONS } from "@/lib/rbac";
import { authorizationResult } from "@/lib/rbac/errors/authorization-error";
import { auth } from "@/lib/authentication/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const userInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  username: z.string().trim().min(3).max(254).optional(),
  phoneNumber: z.string().trim().max(24).optional().nullable(),
  password: z.string().min(8).max(128).optional(),
});
const path = "/admin/user-management";
const fail = (error, fallback) => authorizationResult(error) ?? { ok: false, status: 500, message: fallback };

export async function getAllUsers(options = {}) {
  try {
    const access = await authorizeAction({ permission: PERMISSIONS.USERS.READ });
    const page = Math.max(1, Number(options.page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(options.perPage) || 10));
    const q = String(options.q || "").trim();
    const filters = [];
    if (options.userStatus) filters.push({ status: options.userStatus });
    if (options.bankAccountStatus) filters.push({ wallet: { is: { bankAccounts: { some: { status: options.bankAccountStatus } } } } });
    const where = {
      ...applyPermissionScope(access, PERMISSIONS.USERS.READ, "id"),
      ...(q ? { OR: [{ name: { contains: q } }, { email: { contains: q } }, { username: { contains: q } }, { phoneNumber: { contains: q } }, { userUtilities: { is: { firstName: { contains: q } } } }, { userUtilities: { is: { lastName: { contains: q } } } }] } : {}),
      ...(filters.length ? { AND: filters } : {}),
    };
    const [total, data] = await Promise.all([
      prismaDB.user.count({ where }),
      prismaDB.user.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * perPage, take: perPage, include: { userUtilities: true, wallet: { include: { bankAccounts: true } }, userRoles: { include: { role: true } } } }),
    ]);
    return { ok: true, status: 200, data: { data, total, page, perPage }, message: "فهرست کاربران دریافت شد" };
  } catch (error) { return fail(error, "دریافت کاربران ناموفق بود"); }
}

export async function getUserById(id) {
  try {
    const access = await authorizeAction({ permission: PERMISSIONS.USERS.READ });
    if (!id) return { ok: false, status: 400, message: "شناسه کاربر الزامی است" };
    const data = await prismaDB.user.findFirst({ where: { id, ...applyPermissionScope(access, PERMISSIONS.USERS.READ, "id") }, include: { userUtilities: true, userRoles: { include: { role: true } }, userPermission: { include: { permission: true } } } });
    if (!data) return { ok: false, status: 404, message: "کاربر پیدا نشد" };
    return { ok: true, status: 200, data, message: "اطلاعات کاربر دریافت شد" };
  } catch (error) { return fail(error, "دریافت اطلاعات کاربر ناموفق بود"); }
}

export async function createUser(values) {
  try {
    await authorizeAction({ permission: PERMISSIONS.USERS.CREATE });
    const parsed = userInput.safeParse(values);
    if (!parsed.success || !parsed.data.password) return { ok: false, status: 400, message: "اطلاعات کاربر یا رمز عبور معتبر نیست", errors: parsed.success ? { password: ["رمز عبور الزامی است"] } : parsed.error.flatten().fieldErrors };
    const { password, ...body } = parsed.data;
    const created = await auth.api.signUpEmail({ body: { ...body, username: body.username || body.email.split("@")[0], password }, headers: await headers() });
    revalidatePath(path);
    return { ok: true, status: 201, data: created.user, message: "کاربر ایجاد شد" };
  } catch (error) { return fail(error, error?.code === "P2002" ? "ایمیل یا نام کاربری تکراری است" : "ایجاد کاربر ناموفق بود"); }
}

export async function editUser(id, values) {
  try {
    const access = await authorizeAction({ permission: PERMISSIONS.USERS.UPDATE });
    if (!id) return { ok: false, status: 400, message: "شناسه کاربر الزامی است" };
    if (!access.isSuperAdmin && access.user.id !== id) return { ok: false, status: 403, code: "FORBIDDEN", message: "شما مجوز ویرایش این کاربر را ندارید" };
    const parsed = userInput.omit({ password: true, email: true }).safeParse(values);
    if (!parsed.success) return { ok: false, status: 400, message: "اطلاعات کاربر معتبر نیست", errors: parsed.error.flatten().fieldErrors };
    const data = await prismaDB.user.update({ where: { id }, data: parsed.data });
    revalidatePath(path);
    return { ok: true, status: 200, data, message: "کاربر ویرایش شد" };
  } catch (error) { return fail(error, "ویرایش کاربر ناموفق بود"); }
}

export async function deleteUser(id) {
  try {
    const access = await authorizeAction({ permission: PERMISSIONS.USERS.DELETE });
    if (!id) return { ok: false, status: 400, message: "شناسه کاربر الزامی است" };
    if (id === access.user.id) return { ok: false, status: 403, code: "FORBIDDEN", message: "امکان حذف حساب خودتان وجود ندارد" };
    const target = await prismaDB.user.findUnique({ where: { id }, include: { userRoles: { include: { role: true } } } });
    if (!target) return { ok: false, status: 404, message: "کاربر پیدا نشد" };
    if (target.userRoles.some(({ role }) => role?.isSuperAdmin)) return { ok: false, status: 403, code: "FORBIDDEN", message: "حساب SuperAdmin قابل حذف نیست" };
    await prismaDB.user.delete({ where: { id } });
    revalidatePath(path);
    return { ok: true, status: 200, message: "کاربر حذف شد" };
  } catch (error) { return fail(error, "حذف کاربر ناموفق بود"); }
}
