"use client";

import { authClient } from "@/lib/authentication/auth-client";

export default function useLoginClient() {
    const {
        data: session,
        isPending,
        error,
    } = authClient.useSession();

    return {
        ok: !!session?.user && !isPending && !error,
        isPending,
        error: error ?? null,
        session: session ?? null,
        user: session?.user ?? null,
        role: session?.user?.role ?? null,
    };
}
