import { routes } from "@/lib/routes/routes";
import { PERMISSIONS } from "@/lib/rbac/config/permissions";

export default [{ order: 90, label: "تنظیمات", icon: "icon-settings", link: routes.admin.panel.settings, permission: PERMISSIONS.USERS.READ }];
