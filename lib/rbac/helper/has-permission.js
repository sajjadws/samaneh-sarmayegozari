export function hasPermission(permissions, requiredPermission) {
	const permissionSet = new Set(permissions);

	if (permissionSet.has("*")) {
		return true;
	}

	if (permissionSet.has(requiredPermission)) {
		return true;
	}

	const [resource] = requiredPermission.split(".");

	return permissionSet.has(`${resource}.*`);
}
