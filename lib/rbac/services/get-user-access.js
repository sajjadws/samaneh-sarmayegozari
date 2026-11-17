import "server-only";
import { getUserRoles } from "./get-user-roles";
import { getUserPermissions } from "./get-user-permissions";

export async function getUserAccess(userId) {
	const roles = await getUserRoles(userId);

	if (roles.length > 1 ){
		throw new Error("can not use role more than one");
	}

	const permissions = await getUserPermissions(userId, roles);
	return { roles, permissions, isSuperAdmin: roles.some((role) => role.isSuperAdmin) };
}
