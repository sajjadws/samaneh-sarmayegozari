"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { authorizeAction, PERMISSIONS } from "@/lib/rbac";
import { applyPermissionScope } from "@/lib/rbac/policies/scope-policy";
import { authorizationResult } from "@/lib/rbac/errors/authorization-error";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const assignmentSchema = z.array(z.object({
  permissionId: z.string().min(1),
  scope: z.enum(["OWN", "GLOBAL"]).nullable().optional(),
}));
const result = (ok, status, message, data = null, errors = null) => ({ ok, status, message, data, errors });
const staffPath = "/admin/staff-management";

async function staffTarget(userId) {
  const user = await prismaDB.user.findUnique({
    where: { id: userId },
    include: { userRoles: { include: { role: { select: { id: true, name: true, isSuperAdmin: true } } } } },
  });
  if (!user || !user.userRoles.some(({ role }) => role && !role.isSuperAdmin)) return null;
  if (user.userRoles.some(({ role }) => role?.isSuperAdmin)) return null;
  return user;
}

export async function getAllUsers(actorIdOrOptions, maybeOptions = {}) {
  try {
    const access = await authorizeAction({ permission: PERMISSIONS.USERS.READ });
    const options = actorIdOrOptions && typeof actorIdOrOptions === "object" ? actorIdOrOptions : maybeOptions;
    const page = Math.max(1, Number(options.page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(options.perPage) || 10));
    const q = String(options.q || "").trim();
    const scopeWhere = applyPermissionScope(access, PERMISSIONS.USERS.READ, "id");
    const where = {
      ...scopeWhere,
      userRoles: { some: { role: { isSuperAdmin: false }, ...(options.role ? { roleId: String(options.role) } : {}) } },
      ...(q ? { OR: [
        { name: { contains: q } }, { email: { contains: q } },
        { username: { contains: q } }, { phoneNumber: { contains: q } },
        { userUtilities: { is: { firstName: { contains: q } } } },
        { userUtilities: { is: { lastName: { contains: q } } } },
      ] } : {}),
    };
    const [total, data] = await Promise.all([
      prismaDB.user.count({ where }),
      prismaDB.user.findMany({
        where, orderBy: { createdAt: "desc" }, skip: (page - 1) * perPage, take: perPage,
        include: { userUtilities: true, userRoles: { include: { role: { select: { id: true, name: true, title: true } } } } },
      }),
    ]);
    return result(true, 200, "فهرست کارمندان دریافت شد", { data, total, page, perPage });
  } catch (error) {
    return authorizationResult(error) ?? result(false, 500, "دریافت فهرست کارمندان ناموفق بود");
  }
}

export async function getStaffDetails(id) {
  try {
    const access = await authorizeAction({ permission: PERMISSIONS.USERS.READ });
    if (!id) return result(false, 400, "شناسه کارمند الزامی است");
    const scopeWhere = applyPermissionScope(access, PERMISSIONS.USERS.READ, "id");
    const user = await prismaDB.user.findFirst({
      where: { id, ...scopeWhere, userRoles: { some: { role: { isSuperAdmin: false } } } },
      include: {
        userPermission: { include: { permission: true } },
        userRoles: { include: { role: { select: { id: true, name: true, title: true, isSuperAdmin: true } } } },
        userUtilities: true,
      },
    });
    if (!user || user.userRoles.some(({ role }) => role?.isSuperAdmin)) return result(false, 404, "کارمند پیدا نشد");
    return result(true, 200, "اطلاعات کارمند دریافت شد", user);
  } catch (error) {
    return authorizationResult(error) ?? result(false, 500, "دریافت اطلاعات کارمند ناموفق بود");
  }
}

export async function getStaffPermissionCatalog() {
  try {
    await authorizeAction({ permission: PERMISSIONS.PERMISSIONS.READ });
    const data = await prismaDB.permission.findMany({ orderBy: { name: "asc" } });
    return result(true, 200, "فهرست دسترسی‌ها دریافت شد", data);
  } catch (error) {
    return authorizationResult(error) ?? result(false, 500, "دریافت دسترسی‌ها ناموفق بود");
  }
}

export async function updateStaffPermissions(userId, assignments = []) {
  try {
    const actor = await authorizeAction({ permission: PERMISSIONS.PERMISSIONS.UPDATE });
    if (!userId) return result(false, 400, "شناسه کارمند الزامی است");
    const target = await staffTarget(userId);
    if (!target) return result(false, 404, "کارمند پیدا نشد");
    if (!actor.isSuperAdmin && actor.user.id !== userId) return result(false, 403, "اجازه ویرایش دسترسی‌های این کارمند را ندارید.");
    const parsed = assignmentSchema.safeParse(assignments);
    if (!parsed.success) return result(false, 400, "اطلاعات دسترسی‌ها معتبر نیست", null, parsed.error.flatten().fieldErrors);
    const ids = parsed.data.map((item) => item.permissionId);
    if (new Set(ids).size !== ids.length) return result(false, 400, "یک دسترسی بیش از یک بار ارسال شده است");
    const permissionRows = ids.length ? await prismaDB.permission.findMany({ where: { id: { in: ids } }, select: { id: true, name: true } }) : [];
    if (permissionRows.length !== ids.length) return result(false, 400, "یک یا چند دسترسی معتبر نیستند");
    const names = new Map(permissionRows.map(({ id, name }) => [id, name]));
    for (const item of parsed.data) {
      const read = names.get(item.permissionId)?.endsWith(".read");
      if (read && !["OWN", "GLOBAL"].includes(item.scope)) return result(false, 400, "برای دسترسی مشاهده باید محدوده انتخاب شود");
      if (!read && item.scope != null) return result(false, 400, "Scope فقط برای مجوزهای مشاهده مجاز است");
    }
    const updated = await prismaDB.$transaction(async (tx) => {
      await tx.userPermission.deleteMany({ where: { userId } });
      if (parsed.data.length) await tx.userPermission.createMany({ data: parsed.data.map(({ permissionId, scope }) => ({ userId, permissionId, scope: scope ?? null, assignedBy: actor.user.id })) });
      return tx.user.findUnique({ where: { id: userId }, include: { userPermission: { include: { permission: true } } } });
    });
    revalidatePath(staffPath);
    revalidatePath(`${staffPath}/edit/${userId}`);
    return result(true, 200, "دسترسی‌های کارمند به‌روزرسانی شدند", updated);
  } catch (error) {
    return authorizationResult(error) ?? result(false, 500, "ذخیره دسترسی‌های کارمند ناموفق بود");
  }
}
