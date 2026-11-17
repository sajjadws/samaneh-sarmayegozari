import { Suspense } from "react";
import { authorizePage } from "@/lib/rbac";
import UserLayoutClient from "./user-layout-client";

async function UserPanelContent({ children, permission, permissions, role, roles }) {
  const access = await authorizePage({ permission, permissions, role, roles });
  const clientAccess = JSON.parse(JSON.stringify({
    roles: access.roles,
    permissions: access.permissions,
    isSuperAdmin: access.isSuperAdmin,
  }));
  return <UserLayoutClient access={clientAccess}>{children}</UserLayoutClient>;
}

export default function UserPanel({ children, permission, permissions, role, roles }) {
  return (
    <Suspense fallback={<div className="w-100 h-100 d-flex align-items-center justify-content-center">در حال دریافت اطلاعات...</div>}>
      <UserPanelContent permission={permission} permissions={permissions} role={role} roles={roles}>{children}</UserPanelContent>
    </Suspense>
  );
}
