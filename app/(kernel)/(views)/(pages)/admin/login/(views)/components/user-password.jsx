"use server";

import { auth } from "@/lib/authentication/auth";

export async function login({ username, password }) {
    return auth.api.signInUsername({
        body: { username, password },
    });
}
