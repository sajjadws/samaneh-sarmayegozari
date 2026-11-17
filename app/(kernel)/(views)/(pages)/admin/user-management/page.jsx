import { Suspense } from "react";
import { ShowUsers } from "./(pages)/show/page";
import Link from "next/link";

export default function AdminUserManagementPage({ searchParams }) {
	return (
		<Suspense>
			<ShowUsers searchParams={searchParams} />
		</Suspense>
	);
}
