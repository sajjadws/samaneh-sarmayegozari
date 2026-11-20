import { routes } from "@/lib/routes/routes";
import Link from "next/link";
import { Suspense } from "react";

export default function AdminUserManagementPage({ searchParams }) {
	return (
		<>
			<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
				<div className="container w-100 h-100 gap-8">
					<div className="block w-100 d-flex flex-column align-items-start gap-2">
						<h1 className="">تنظیمات</h1>
						<p className="">مدیریت کارکنان و سطح دسترسی سامانه</p>
					</div>
					<div className="block flex-column w-100 h-100 p-10 gap-4 bg-section-color radius-all-normal shadow-lg">
						<Link href={routes.admin.panel.staffManagement.root} className="d-flex justify-content-space-between py-3 w-100 align-items-center bb-style-solid border-color bw-1">
							<div className="d-flex align-items-center gap-4">
								<i className="icon icon-profile-2user txt-size-high-title bg-primary-light-color p-4 radius-all-normal"></i>
								<div className="d-flex flex-column">
									<span className="txt-size-mid-title">مدیریت کارکنان</span>
									<p className="txt-size-normal">مشاهده فهرست کاربران، تغییر نقش و فعال یا غیرفعال‌کردن حساب‌ها</p>
								</div>
							</div>
							<i className="icon icon-arrow-left-2 txt-size-normal"></i>
						</Link>
						<Link href={routes.admin.panel.roles.root} className="d-flex justify-content-space-between py-3 w-100 align-items-center">
							<div className="d-flex align-items-center gap-4">
								<i className="icon icon-shield-tick txt-size-high-title bg-primary-light-color p-4 radius-all-normal"></i>
								<div className="d-flex flex-column">
									<span className="txt-size-mid-title">نقش‌ها و سطح دسترسی</span>
									<p className="txt-size-normal">تعیین مجوز مشاهده، ایجاد، ویرایش و حذف برای هر نقش</p>
								</div>
							</div>
							<i className="icon icon-arrow-left-2 txt-size-normal"></i>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
