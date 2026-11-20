import UserPanel from "@/app/(kernel)/layouts/user-panel";
import { PERMISSIONS } from "@/lib/rbac/permissions";

export default function RolesLayout({ children }) {
    return <UserPanel permission={PERMISSIONS.ROLES.READ}>{children}</UserPanel>;
}
