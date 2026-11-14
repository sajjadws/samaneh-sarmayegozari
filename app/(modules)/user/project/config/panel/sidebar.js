import { routes } from "@/lib/routes/routes";

const sidebarProjectItems = [
	{
		order: 0,
		label: "projects",
		icon: "icon-3full",
		link: routes.user.panel.projects.root,
		role: "user",
	},
	{
		order: 1,
		label: "my projects",
        icon: "icon-3full",
		link: routes.user.panel.projects.investments,
		role: "user",
	},
];

export default sidebarProjectItems;
