"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { authorize } from "@/lib/rbac/authorize";
import { PERMISSIONS } from "@/lib/rbac/config/permissions";
import { authorizationResult } from "@/lib/rbac/errors/authorization-error";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const roleSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2)
		.max(60)
		.regex(/^[a-z][a-z0-9_-]*$/),
	title: z.string().trim().min(2).max(100),
	description: z.string().trim().max(500).optional().nullable(),
});
const permissionAssignmentSchema = z.object({
	permissionId: z.string().min(1),
	scope: z.enum(["OWN", "GLOBAL"]).nullable().optional(),
});
const rolePermissionsSchema = z.array(permissionAssignmentSchema);
const result = (ok, status, message, data = null, errors = null) => ({ ok, status, message, data, errors });
const rolesPath = "/admin/roles";

export async function getAllRoles(options = {}) {
	try {
		await authorize({ permission: PERMISSIONS.ROLES.READ });
		const page = Math.max(1, Number(options.page) || 1);
		const perPage = Math.min(100, Math.max(1, Number(options.perPage) || 10));
		const q = String(options.q || "").trim();
		const where = q
			? { OR: [{ name: { contains: q } }, { title: { contains: q } }, { description: { contains: q } }] }
			: {};
		const [total, data] = await Promise.all([
			prismaDB.role.count({ where }),
			prismaDB.role.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (page - 1) * perPage,
				take: perPage,
				include: { _count: { select: { users: true, permissions: true } } },
			}),
		]);
		return result(true, 200, "نقش‌ها دریافت شدند", { data, total, page, perPage });
	} catch (error) {
		return authorizationResult(error) ?? result(false, 500, "دریافت نقش‌ها ناموفق بود");
	}
}

export async function getRoleDetails(id) {
	try {
		await authorize({ permission: PERMISSIONS.ROLES.READ });
		if (!id) return result(false, 400, "شناسه نقش الزامی است");
		const role = await prismaDB.role.findUnique({
			where: { id },
			include: { permissions: { include: { permission: true } } },
		});
		if (!role) return result(false, 404, "نقش پیدا نشد");
		return result(true, 200, "اطلاعات نقش دریافت شد", role);
	} catch (error) {
		return authorizationResult(error) ?? result(false, 500, "دسترسی یا دریافت اطلاعات ناموفق بود");
	}
}

export async function getPermissionCatalog() {
	try {
		await authorize({ permission: PERMISSIONS.PERMISSIONS.READ });
		const data = await prismaDB.permission.findMany({ orderBy: { name: "asc" } });
		return result(true, 200, "مجوزها دریافت شدند", data);
	} catch (error) {
		return authorizationResult(error) ?? result(false, 500, "دریافت مجوزها ناموفق بود");
	}
}

export async function createRole(values) {
	try {
		await authorize({ permission: PERMISSIONS.ROLES.CREATE });
		const parsed = roleSchema.safeParse(values);
		if (!parsed.success)
			return result(false, 400, "اطلاعات نقش معتبر نیست", null, parsed.error.flatten().fieldErrors);
		const role = await prismaDB.role.create({ data: parsed.data });
		revalidatePath(rolesPath);
		return result(true, 201, "نقش ایجاد شد", role);
	} catch (error) {
		if (error.code === "P2002") return result(false, 409, "نام این نقش قبلاً ثبت شده است");
		return authorizationResult(error) ?? result(false, 500, "ایجاد نقش ناموفق بود");
	}
}

export async function updateRole(id, values, assignments = []) {
	try {
		await authorize({ permission: PERMISSIONS.ROLES.UPDATE });
		if (!id) return result(false, 400, "شناسه نقش الزامی است");
		const parsed = roleSchema.safeParse(values);
		const parsedAssignments = rolePermissionsSchema.safeParse(assignments);
		if (!parsed.success || !parsedAssignments.success)
			return result(false, 400, "اطلاعات ارسالی معتبر نیست", null, {
				...(parsed.success ? {} : parsed.error.flatten().fieldErrors),
				...(parsedAssignments.success ? {} : { permissions: parsedAssignments.error.flatten() }),
			});
		const current = await prismaDB.role.findUnique({
			where: { id },
			include: { permissions: { include: { permission: true } } },
		});
		if (!current) return result(false, 404, "نقش پیدا نشد");
		if (current.isSystem && (parsed.data.name !== current.name || parsed.data.title !== current.title))
			return result(false, 403, "مشخصات اصلی نقش سیستمی قابل تغییر نیست");
		if (current.isSuperAdmin) return result(false, 403, "مجوزهای نقش مدیر کل قابل تغییر نیست");
		const ids = parsedAssignments.data.map((item) => item.permissionId);
		if (new Set(ids).size !== ids.length) return result(false, 400, "مجوز تکراری ارسال شده است");
		const permissions = ids.length
			? await prismaDB.permission.findMany({ where: { id: { in: ids } }, select: { id: true, name: true } })
			: [];
		if (permissions.length !== ids.length) return result(false, 400, "یک یا چند مجوز معتبر نیستند");
		const nameById = new Map(permissions.map((item) => [item.id, item.name]));
		for (const item of parsedAssignments.data) {
			const isRead = nameById.get(item.permissionId)?.endsWith(".read");
			if (isRead && !["OWN", "GLOBAL"].includes(item.scope))
				return result(false, 400, "برای مجوز مشاهده باید Scope انتخاب شود");
			if (!isRead && item.scope != null) return result(false, 400, "Scope فقط برای مجوزهای مشاهده مجاز است");
		}
		const updated = await prismaDB.$transaction(async (tx) => {
			await tx.role.update({ where: { id }, data: parsed.data });
			await tx.rolePermission.deleteMany({ where: { roleId: id } });
			if (parsedAssignments.data.length)
				await tx.rolePermission.createMany({
					data: parsedAssignments.data.map((item) => ({
						roleId: id,
						permissionId: item.permissionId,
						scope: item.scope ?? null,
					})),
				});
			return tx.role.findUnique({ where: { id }, include: { permissions: { include: { permission: true } } } });
		});
		revalidatePath(rolesPath);
		return result(true, 200, "نقش و دسترسی‌ها به‌روزرسانی شدند", updated);
	} catch (error) {
		if (error.code === "P2002") return result(false, 409, "نام این نقش قبلاً ثبت شده است");
		return authorizationResult(error) ?? result(false, 500, "ویرایش نقش ناموفق بود");
	}
}

export async function deleteRole(id) {
	try {
		await authorize({ permission: PERMISSIONS.ROLES.DELETE });
		if (!id) return result(false, 400, "شناسه نقش الزامی است");
		const role = await prismaDB.role.findUnique({ where: { id } });
		if (!role) return result(false, 404, "نقش پیدا نشد");
		if (role.isSystem || role.isSuperAdmin) return result(false, 403, "نقش سیستمی قابل حذف نیست");
		await prismaDB.role.delete({ where: { id } });
		revalidatePath(rolesPath);
		return result(true, 200, "نقش حذف شد");
	} catch (error) {
		return authorizationResult(error) ?? result(false, 500, "حذف نقش ناموفق بود");
	}
}

export async function assignUserRole(userId, roleId) {
	try {
		const actor = await authorize({ permission: PERMISSIONS.ROLES.ASSIGN });
		if (!userId || !roleId) return result(false, 400, "کاربر و نقش الزامی هستند");
		const role = await prismaDB.role.findUnique({ where: { id: roleId }, select: { id: true, name: true, isSuperAdmin: true, isSystem: true } });
		if (!role) return result(false, 404, "نقش پیدا نشد");
		if (role.isSuperAdmin || role.name === "admin") return result(false, 403, "تخصیص نقش SuperAdmin از این مسیر مجاز نیست");
		if (role.isSystem && !actor.isSuperAdmin) return result(false, 403, "فقط SuperAdmin می‌تواند نقش سیستمی را تخصیص دهد");
		const target = await prismaDB.userRole.findUnique({ where: { userId }, select: { role: { select: { isSuperAdmin: true } } } });
		if (target?.role?.isSuperAdmin) return result(false, 403, "تغییر نقش حساب SuperAdmin از این مسیر مجاز نیست");
		const assignment = await prismaDB.userRole.upsert({
			where: { userId },
			update: { roleId, assignedBy: actor.user.id },
			create: { userId, roleId, assignedBy: actor.user.id },
		});
		revalidatePath(rolesPath);
		return result(true, 200, "نقش کاربر به‌روزرسانی شد", assignment);
	} catch (error) {
		return authorizationResult(error) ?? result(false, 500, "تخصیص نقش ناموفق بود");
	}
}
