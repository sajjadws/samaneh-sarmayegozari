import Link from "next/link";
import { Suspense } from "react";
import ShowUsers from "./components/user-table";

export default function AdminStaffManagementPage({ searchParams }) {
	return (
		<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
			<div className="container w-100 h-100 gap-8">
				<div className="block w-100 d-flex flex-column align-items-start gap-2">
					<h1>مدیریت کارمندان</h1>
					<p>مشاهده و مدیریت حساب کارمندان</p>
					<Link
						href="/admin/staff-management/create"
						className="btn btn-primary"
					>
						افزودن کارمند جدید
					</Link>
				</div>
				<div className="block w-100 h-100">
					<Suspense>
						<ShowUsers searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
		</section>
	);
}
