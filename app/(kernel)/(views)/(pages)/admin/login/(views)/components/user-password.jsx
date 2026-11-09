// "use server";

// import { auth } from "@/lib/authentication/auth";

// export async function UserPassword() {
// 	const data = await auth.api.signUpEmail({
//         body: {
//             email: "email@domain.com", // required, The email of the user.
//             name: "Test User", // required, The name of the user.
//             password: "password1234", // required, The password of the user.
//             username: "test", // The username of the user.
//             displayUsername: "Test User123", // An optional display username of the user.
//         },
//     });
//     console.log(data);

//     return;
// }

"use server";

import { auth } from "@/lib/authentication/auth";

// Signup
export async function signup() {
	return await auth.api.signUpEmail({
		body: {
			email: "email@domain.com",
			name: "Test User",
			password: "password1234",
			username: "test",
			displayUsername: "Test User123",
		},
	});
}

// Login
export async function login({ email, password }) {
	return await auth.api.signInEmail({
		body: {
			email,
			password,
		},
	});
}