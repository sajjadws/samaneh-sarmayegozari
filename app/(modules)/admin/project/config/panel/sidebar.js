import { routes } from "@/lib/routes/routes";

const sidebarProjectItems = [
	{
		id:1,
		order: 0,
		label: "projects",
		icon: "icon-3full",
		link:" routes.panel.adminProjects",
		role: "admin",
	},
	{
		id:2,
		order: 1,
		label: "my projects",
        icon: "icon-3full",
		link: "routes.panel.myProjects",
		role: "admin",
	},
];

export default sidebarProjectItems;
