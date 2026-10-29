import { auth } from "@/lib/authentication/auth";
import { headers } from "next/headers";

export default async function useLoginServer() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		const user = session?.user ?? null;

		return {
			ok: !!user,
			isPending: false,
			error: null,
			session: session ?? null,
			user,
			role: user?.role ?? null,
		};
	} catch (error) {
		console.error("[GET_IS_LOGIN_ERROR]", error);

		return {
			ok: false,
			isPending: false,
			error,
			session: null,
			user: null,
			role: null,
		};
	}
}
