
export const routes = {
	admin: {
		panel: {
			settings: "/admin/settings",
			dashboard: "/admin/dashboard",
			investmentPortfolio: "/admin/investment-portfolio",
			userManagement: {
				root: "/admin/user-management",
				create: "/admin/user-management/create",
				edit: "/admin/user-management/edit",
				show: "/admin/user-management/show",
			},
			staffManagement: {
				root: "/admin/staff-management",
				create: "/admin/staff-management/create",
				edit: "/admin/staff-management/edit",
				show: "/admin/staff-management/show",
			},
			roles: {
				root: "/admin/roles",
				create: "/admin/roles/create",
				edit: "/admin/roles/edit",
				show: "/admin/roles/show",
				permissions: (id) => `/admin/roles/show/${id}`,
			},
			projects: {
				root: "/admin/projects",
				investments: "/admin/projects/investments",
			},
			wallet: "/admin/wallet",
			tickets: "/admin/tickets",
			// permissions: {
			// 	root: "/admin/permission",
			// 	role: (id) => `/admin/permission/${id}`
			// }
		}
	},
	user: {
		login: "/user/login",
		profile: {
			root: "/user/profile/personal-info",
			id: (id) => `/user/profile/personal-info/${id}`
		},
		panel: {
			dashboard: "/user/dashboard",
			investmentPortfolio: "/user/investment-portfolio",
			projects: {
				root: "/user/projects",
				investments: "/user/projects/investments",
			},
			wallet: "/user/wallet",
			tickets: "/user/tickets"
		}
	},
};
