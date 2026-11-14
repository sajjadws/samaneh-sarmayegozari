import { Suspense } from "react";
import { ShowUsers } from "./(pages)/show/page";
import Link from "next/link";

export default function AdminUserManagementPage({ searchParams }) {
	return (
		// <>
		// 	<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
		// 		<div className="container w-100 h-100 gap-8">
		// 			<div className="block w-100 align-items-center justify-content-space-between">
		// 				<div className="block w-100 d-flex flex-column align-items-start gap-2">
		// 					<h1 className="txt-size-mid-title title-text-color font-weight-bold">مدیریت کاربران</h1>
		// 					<p className="txt-size-title secondary-text-color">
		// 						مشاهده اطلاعات کاربران، بررسی وضعیت حساب و احراز هویت
		// 					</p>
		// 				</div>
		// 				<Link className="d-flex align-items-center gap-1 primary-color" href="/user/dashboard">
		// 					<span className="txt-size-normal">بازگشت</span>
		// 					<i className="icon icon-arrow-left txt-size-title" />
		// 				</Link>
		// 			</div>
		// 			<div className="block flex-column gap-3 w-100 h-100">
		// 				<Suspense>
		// 					<ShowUsers searchParams={searchParams} />
		// 				</Suspense>
		// 			</div>
		// 		</div>
		// 	</section>
		// </>
		<Suspense>
			<ShowUsers searchParams={searchParams} />
		</Suspense>
	);
}
