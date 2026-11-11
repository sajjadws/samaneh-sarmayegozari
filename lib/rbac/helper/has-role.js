export function hasRole(roles, requiredRole) {
	return roles.some((role) => role.name === requiredRole);
}
