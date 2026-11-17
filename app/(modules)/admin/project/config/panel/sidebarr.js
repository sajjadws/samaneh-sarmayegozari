import { routes } from "@/lib/routes/routes";

const sidebarProjectItems = [
	{
		order: 2,
		label: "طرح ها",
		icon: "icon-document-text-1",
		link: routes.admin.panel.projects.root,
		role: "admin",
	},
	// {
	// 	order: 1,
	// 	label: "my projects",
    //     icon: "icon-3full",
	// 	link: routes.admin.panel.projects.investments,
	// 	role: "admin",
	// },
];

export default sidebarProjectItems;
