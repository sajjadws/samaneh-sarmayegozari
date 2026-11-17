import "server-only";
import { READ_PERMISSION_NAMES } from "../config/permissions";
import { forbidden } from "../errors/authorization-error";

export function getPermissionScope(access, permission) {
  if (access?.isSuperAdmin) return "GLOBAL";
  if (!READ_PERMISSION_NAMES.has(permission)) return null;
  const entry = access?.permissions?.[permission];
  if (!entry?.allowed || !["OWN", "GLOBAL"].includes(entry.scope)) throw forbidden();
  return entry.scope;
}

export function applyPermissionScope(access, permission, ownerField = "userId") {
  const scope = getPermissionScope(access, permission);
  if (!scope || scope === "GLOBAL") return {};
  return { [ownerField]: access.user.id };
}
