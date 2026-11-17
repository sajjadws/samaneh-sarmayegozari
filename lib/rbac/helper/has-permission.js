export function hasPermission(permissions, requiredPermission) {
	if (permissions instanceof Map) return permissions.has(requiredPermission);
	if (Array.isArray(permissions)) {
		const names = new Set(permissions);
		return names.has("*") || names.has(requiredPermission) || names.has(`${requiredPermission.split(".")[0]}.*`);
	}
	return Boolean(permissions?.[requiredPermission]?.allowed);
}
