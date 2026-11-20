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
        // additionalFields: {
        //     userUtilities: {
        //         type: "string",
        //         required: false,
        //         input: false,
        //         returned: true,
        //     },
        // },
    },

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
