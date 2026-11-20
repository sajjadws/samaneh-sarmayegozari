"use server";

import { auth } from "@/lib/authentication/auth";
import { headers } from "next/headers";

export async function login({ email, password }) {
	return auth.api.signInEmail({
		body: { email: email.trim().toLowerCase(), password },
		headers: await headers(),
	});
}
