import { Suspense } from "react";
import ContentPage from "./components/content";

export default function LoginAdminPage(){
	return (
		<Suspense>
			<ContentPage/>
		</Suspense>
	);
}