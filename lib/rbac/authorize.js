import "server-only";
import { auth } from "@/lib/authentication/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserAccess } from "./services/get-user-access";
import { hasRole } from "./helper/has-role";
import { hasPermission } from "./helper/has-permission";
import { unauthorized, forbidden } from "./errors/authorization-error";

export async function authorize({ permission, permissions, role, roles, requireAll = true } = {}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw unauthorized();
  const access = await getUserAccess(session.user.id);
  const requiredRoles = [...new Set([...(role ? [role] : []), ...(roles ?? [])])];
  if (requiredRoles.length) {
    const checks = requiredRoles.map((item) => hasRole(access.roles, item));
    if (!(requireAll ? checks.every(Boolean) : checks.some(Boolean))) throw forbidden();
  }
  const requiredPermissions = [...new Set([...(permission ? [permission] : []), ...(permissions ?? [])])];
  if (requiredPermissions.length && !access.isSuperAdmin) {
    const checks = requiredPermissions.map((item) => hasPermission(access.permissions, item));
    if (!(requireAll ? checks.every(Boolean) : checks.some(Boolean))) throw forbidden();
  }
  return { user: session.user, ...access };
}

export async function authorizePage(options) {
  try {
    return await authorize(options);
  } catch (error) {
    if (error?.status === 401) redirect("/admin/login");
    if (error?.status === 403) redirect("/admin/forbidden");
    throw error;
  }
}

export async function authorizeAction(options) {
  return authorize(options);
}
