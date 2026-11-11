import { prismaAdapter } from "better-auth/adapters/prisma";
import prismaDB from "../prisma/prismaDB";

import { betterAuth } from "better-auth";

import { phoneNumber, username } from "better-auth/plugins";

import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
	database: prismaAdapter(prismaDB, {
		provider: "mysql",
	}),
	user: {
        modelName: "user",

        additionalFields: {
            userUtilitiesId: {
                type: "string",
                required: false,
                input: false,
                returned: true,
            },
        },
    },
	// advanced: {
	// 	database: {
	// 		generateId: "",
	// 	},
	// },
	emailAndPassword: { 
        enabled: true, 
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
