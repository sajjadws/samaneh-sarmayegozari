import "server-only";

import { auth } from "@/lib/authentication/auth";
import { headers } from "next/headers";

import { getUserAccess } from "./services/get-user-access";
import { hasRole } from "./helper/has-role";
import { hasPermission } from "./helper/has-permission";

import { unauthorized, forbidden } from "./errors/authorization-error";

export async function authorize({ permission, permissions, role, roles, requireAll = true } = {}) {
	// 1. بررسی Session
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw unauthorized();
	}

	// 2. دریافت اطلاعات دسترسی
	const access = await getUserAccess(session.user.id);

	const { roles: userRoles, permissions: userPermissions, isSuperAdmin } = access;

	// 3. بررسی Role
	const requiredRoles = [...new Set([...(role ? [role] : []), ...(roles ?? [])])];

	if (requiredRoles.length > 0) {
		const roleResults = requiredRoles.map((item) => hasRole(userRoles, item));

		const roleAllowed = requireAll ? roleResults.every(Boolean) : roleResults.some(Boolean);

		if (!roleAllowed) {
			throw forbidden();
		}
	}

	// 4. بررسی Permission
	const requiredPermissions = [...new Set([...(permission ? [permission] : []), ...(permissions ?? [])])];

	if (requiredPermissions.length > 0 && !isSuperAdmin) {
		const permissionResults = requiredPermissions.map((item) => hasPermission(userPermissions, item));

		const permissionAllowed = requireAll ? permissionResults.every(Boolean) : permissionResults.some(Boolean);

		if (!permissionAllowed) {
			throw forbidden();
		}
	}

	// 5. بازگرداندن اطلاعات
	return {
		user: session.user,
		...access,
	};
}
