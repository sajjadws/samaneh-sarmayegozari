import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber, username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import prismaDB from "../prisma/prismaDB.js";

export const auth = betterAuth({
	database: prismaAdapter(prismaDB, {
		provider: "postgresql",
	}),

	user: { modelName: "user" },

	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},

	plugins: [
		phoneNumber({
			sendOTP: async ({ phoneNumber, code }, ctx) => {
				console.log("mycode: ", code);
			},
		}),
		username(),
		nextCookies(),
	],
});
