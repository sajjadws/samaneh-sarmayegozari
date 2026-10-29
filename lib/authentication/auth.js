import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismaDB from "../prisma/prismaDB";
import { phoneNumber } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
	database: prismaAdapter(prismaDB, {
		provider: "mysql",
	}),
	user: {
		modelName: "user",
		fields: {
			name: "fullName",
			image: "image",
		},
		additionalFields: {
			role: {
				type: "string",
				required: false,
				input: false,
				returned: true
			},
			phoneNumberVerified: {
				type: "boolean",
				required: false,
				input: false,
				returned: true
			},
		},
	},
	// advanced: {
	// 	database: {
	// 		generateId: "",
	// 	},
	// },
	plugins: [
		nextCookies(),
		phoneNumber({
			sendOTP: async ({ phoneNumber, code }, ctx) => {
				console.log("mycode: ", code);
			},
		}),
	],
});
