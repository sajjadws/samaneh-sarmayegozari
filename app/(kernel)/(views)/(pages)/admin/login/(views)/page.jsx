import { Suspense } from "react";
import ContentPage from "./components/content";
import { getAdminLoginStatus } from "./actions/authentication";

export default async function LoginAdminPage() {
	const data = await getAdminLoginStatus();

console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)

	return (
		<Suspense fallback={<div>loading...</div>}>
			<ContentPage />
		</Suspense>
	);
}
