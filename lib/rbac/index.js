export { authorize, authorizePage, authorizeAction } from "./authorize";
export { hasRole } from "./helper/has-role";
export { hasPermission } from "./helper/has-permission";
export { PERMISSIONS, PERMISSION_CATALOG, ALL_PERMISSION_NAMES, READ_PERMISSION_NAMES, ROLE_PERMISSION_CONFIG } from "./config/permissions";
export { AuthorizationError, authorizationResult } from "./errors/authorization-error";
export { getPermissionScope, applyPermissionScope } from "./policies/scope-policy";
