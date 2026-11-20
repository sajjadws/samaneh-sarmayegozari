import { Suspense } from "react";
import { ShowUsers } from "./(pages)/show/page";

export default function AdminUserManagementPage({ searchParams }) {
	return (
		<>
			<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
				<div className="container w-100 h-100 gap-8">
					<div className="block w-100 d-flex flex-column align-items-start gap-2">
						<h1 className="">مدیریت نقش‌ها و سطح دسترسی</h1>
						<p className="">تنظیم دسترسی‌های هر نقش به بخش‌های مختلف سامانه</p>
					</div>
					<div className="block w-100 h-100">
						<Suspense>
							<ShowUsers searchParams={searchParams} />
						</Suspense>
					</div>
				</div>
			</section>
		</>
	);
}
