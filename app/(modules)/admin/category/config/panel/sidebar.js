import { routes } from "@/lib/routes/routes";

const sidebarProjectItems = [
	{
		order: 2,
		label: "category",
		link: "/admin/category",
		role: "admin",
		subList: [
			{
				order: 0,
				label: "add category",
				link: "/admin/category/add",
				role: "admin",
			},
			{
				order: 1,
				label: "edit category",
				link: "/admin/category/edit",
				role: "admin",
			},
		],
	},
];

export default sidebarProjectItems;
