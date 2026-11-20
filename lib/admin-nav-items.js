import { routes } from "./routes/routes";

export const adminNavItems = [
	{
		title: "داشبورد",
		type: "link",
		href: routes.admin.panel.dashboard,
		perm_list: ["all"],
		icon: () => <span>icon</span>,
	},
	{
		title: "پروژه ها",
		type: "link",
		href: routes.admin.panel.projects.root,
		perm_list: ["projects.read", "projects.create,", "projects.update", "projects.delete"],
		icon: () => <span>icon</span>,
	},
];
