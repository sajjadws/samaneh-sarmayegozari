// import AdminLayout from "@/app/(kernel)/layouts/admin-panel";
// export default AdminLayout;

import AuthProvider from "@/lib/providers/auth-provider";
import { Suspense } from "react";

export default function AdminLayout({ children }) {
	return (
		<Suspense>
			<AuthProvider>{children}</AuthProvider>
		</Suspense>
	);
}
