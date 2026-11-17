import { headers } from "next/headers";
import { auth } from "../authentication/auth";

export default async function AuthProvider({ children }) {
	// islogin and isadmin

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return {
			ok: false,
			status: 401,
			message: "برای ورود ابتدا وارد حساب کاربری شوید",
		};
	}

	if (!session?.user?.displayUsername) {
		return {
			ok: false,
			status: 401,
			message: "برای ورود باید ادمین باشید",
		};
	}

	return <>{children}</>;
}
