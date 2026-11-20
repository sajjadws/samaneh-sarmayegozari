import { routes } from "@/lib/routes/routes";
import { PERMISSIONS } from "@/lib/rbac/permissions";

export default [
	{
		order: 21,
		label: "مدیریت کاربران",
		icon: "icon-user",
		link: routes.admin.panel.userManagement.root,
		permission: PERMISSIONS.USERS.READ,
	},
];
