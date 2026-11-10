import { createAuthClient } from "better-auth/react";

import { inferAdditionalFields, phoneNumberClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	plugins: [
		phoneNumberClient(),
		inferAdditionalFields({
			user: {
				// role: {
				// 	type: "string",
				// },
				phoneNumberVerified: {
					type: "boolean",
				},
			},
		}),
		usernameClient()
	],
});

export const { useSession, getSession } = authClient;
