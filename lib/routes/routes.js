
export const routes = {
	admin: {
		auth: {
			signIn: "/admin/sign-in",
			signUp: "/admin/sign-up",
		},
		panel: {
			dashboard: "/admin/dashboard",
			investmentPortfolio: "/admin/investment-portfolio",
			projects: {
				root: "admin/projects",
				investments: "admin/projects/investments",
			},
			wallet: "admin/wallet",
			tickets: "admin/tickets"
		}
	},
	user: {
		auth: {
			signIn: "/sign-in",
			signUp: "/sign-up",
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
