import { routes } from "@/lib/routes/routes";
import { PERMISSIONS } from "@/lib/rbac/permissions";

export default [
	{
		order: 20,
		label: "مدیریت کارکنان",
		icon: "icon-users",
		link: routes.admin.panel.staffManagement.root,
		permission: PERMISSIONS.USERS.READ,
	},
];
