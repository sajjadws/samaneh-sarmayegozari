import { routes } from "@/lib/routes/routes";

const sidebarProjectItems = [
	{
		order: 0,
		label: "projects",
		icon: "icon-3full",
		link: "routes.panel.adminProjects",
		role: "admin",
		// subList
	},
	{
		order: 1,
		label: "my projects",
        icon: "icon-3full",
		link: "routes.panel.myProjects",
		role: "admin",
	},
];

export default sidebarProjectItems;
