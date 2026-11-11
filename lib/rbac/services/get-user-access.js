import "server-only";

import { getUserRoles } from "./get-user-roles";
import { getUserPermissions } from "./get-user-permissions";

export async function getUserAccess(userId) {
	const [roles, permissions] = await Promise.all([getUserRoles(userId), getUserPermissions(userId)]);

	return {
		roles,
		permissions,

		isSuperAdmin: roles.some((role) => role.isSuperAdmin),
	};
}
