"use client";

import { authClient } from "@/lib/authentication/auth-client";
import { routes } from "@/lib/routes/routes";
import { Button } from "@/miz/themes/react/components/button/page";
import { useRouter } from "next/navigation";

export default async function HomePage() {
	const router = useRouter();

	async function logOut() {
		const { error } = await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace(routes.user.login);
					router.refresh();
				},
			},
		});

		if (error) {
			console.error("خطا هنگام خروج:", error);
		}
	}

	return (
		<>
			<h1>home page</h1>
			<Button onClick={logOut} className="button button-login">
				خروج
			</Button>
		</>
	);
}
