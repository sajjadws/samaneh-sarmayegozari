import UserPanel from "@/app/(kernel)/layouts/user-panel";
import { PERMISSIONS } from "@/lib/rbac/config/permissions";

export default function RolesLayout({ children }) {
    return <UserPanel permission={PERMISSIONS.ROLES.READ}>{children}</UserPanel>;
}
