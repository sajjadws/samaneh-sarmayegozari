export function canAccessSidebarItem(item, access) {
	if (access?.isSuperAdmin) return true;

	const { permissions = {}, roles = [] } = access ?? {};

	if (item.role) {
		const requiredRoles = Array.isArray(item.role) ? item.role : [item.role];

		const hasRole = requiredRoles.some((role) =>
			roles.some((userRole) => {
				const roleName = typeof userRole === "string" ? userRole : userRole.name;

				return roleName === role;
			}),
		);

		if (!hasRole) return false;
	}

	if (item.permission) {
		const requiredPermissions = Array.isArray(item.permission) ? item.permission : [item.permission];

		const hasPermission = requiredPermissions.some((permission) => permissions[permission]?.allowed === true);

		if (!hasPermission) return false;
	}

	return true;
}

export function filterSidebarItems(items, access) {
	return items
		.map((item) => {
			const subList = item.subList?.length ? filterSidebarItems(item.subList, access) : [];

			const hasAccess = canAccessSidebarItem(item, access);

			if (!hasAccess && subList.length === 0) {
				return null;
			}

			return {
				...item,
				subList,
			};
		})
		.filter(Boolean);
}
