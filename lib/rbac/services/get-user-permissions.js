import "server-only";
import prismaDB from "@/lib/prisma/prismaDB";
import { READ_PERMISSION_NAMES } from "../config/permissions";

export async function getUserPermissions(userId, roles = null) {
  const assignment = roles ? null : await prismaDB.userRole.findUnique({ where: { userId }, select: { roleId: true } });
  const roleIds = roles ? roles.map((role) => role.id) : assignment?.roleId ? [assignment.roleId] : [];
  const [roleRows, userRows] = await Promise.all([
    roleIds.length ? prismaDB.rolePermission.findMany({ where: { roleId: { in: roleIds } }, select: { permission: { select: { name: true } }, scope: true } }) : [],
    prismaDB.userPermission.findMany({ where: { userId }, select: { permission: { select: { name: true } }, scope: true } }),
  ]);
  const resolved = Object.create(null);
  for (const row of roleRows) resolved[row.permission.name] = { allowed: true, scope: row.scope ?? null, source: "role" };
  for (const row of userRows) resolved[row.permission.name] = { allowed: true, scope: row.scope ?? null, source: "user" };
  for (const [name, value] of Object.entries(resolved)) {
    if (READ_PERMISSION_NAMES.has(name) && !["OWN", "GLOBAL"].includes(value.scope)) {
      resolved[name] = { allowed: false, scope: null, source: value.source, invalid: true };
    }
  }
  return resolved;
}
