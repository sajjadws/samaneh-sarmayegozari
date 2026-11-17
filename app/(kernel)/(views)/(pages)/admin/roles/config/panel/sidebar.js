import { routes } from "@/lib/routes/routes";
import { PERMISSIONS } from "@/lib/rbac/config/permissions";

export default [{ order: 30, label: "مدیریت نقش‌ها", icon: "icon-shield-check", link: routes.admin.panel.roles.root, permission: PERMISSIONS.ROLES.READ }];
