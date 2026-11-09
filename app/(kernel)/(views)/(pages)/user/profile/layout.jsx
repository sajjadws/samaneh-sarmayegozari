"use client";

import UserLayout from "@/app/(kernel)/layouts/user-panel";
import { Button } from "@/miz/themes/react/components/button/page";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./profile.css";

// export default UserLayout;
export default function ProfileLayout({ children }) {
    const pathname = usePathname();

    function isActive(href) {
		return pathname === href || pathname.startsWith(`${href}/`);
	}

	return (
		<UserLayout>
			<section className="section justify-content-start align-items-start px-8 py-14">
				<div className="container w-100 gap-6">
					<div className="w-100 d-flex justify-content-space-between align-items-center">
						<h1 className="txt-size-high-title font-weight-bold title-text-color">پروفایل کاربری</h1>
						<Link className="d-flex align-items-center gap-1 primary-color" href={""}>
							<span className="txt-size-normal">بازگشت</span>
							<i className="icon icon-arrow-left txt-size-title"></i>
						</Link>
					</div>
					<div className="block w-100 gap-6">
						<div className="body h-100 shadow-lg w-100 bg-card-color p-9 radius-all-normal d-flex flex-column gap-6">
							{children}
						</div>
						<div className="profile h-100 shadow-lg w-38 bg-card-color py-5 px-6 radius-all-normal d-flex flex-column gap-6">
							<div className="d-flex gap-6 py-5 px-2 bw-1 bb-style-solid">
								<div className="d-flex flex-column gap-2 align-items-end">
									<h2 className="txt-size-mid-title primary-color font-weight-bold">علی رضایی</h2>
									<span className="txt-size-title secondary-text-color">کاربر</span>
									<div className="d-flex gap-1">
										<span className="txt-size-subtitle">وضعیت حساب :</span>
										<span className="d-flex justify-content-center align-items-center bg-success-regular-color px-2 radius-all-full white-color txt-size-small">فعال</span>
									</div>
								</div>
								<img className="shadow-lg aspect-ratio-1x1 grow-1 radius-all-full border-on-primary-color bw-5 border-style-solid" src="/media/images/پروفایل.jpg" alt="" />
							</div>
							<div className="information-list w-100 d-flex flex-column gap-5 primary-color txt-size-title px-4">
								<Link href={"/user/profile/personal-info"} className={utils.cn("information p-2 radius-all-normal", isActive("/user/profile/personal-info") ? "bg-primary-light-color" : "")}>
									اطلاعات شخصی
								</Link>
								<Link href={"/user/profile/account-info"} className={utils.cn("information p-2 radius-all-normal", isActive("/user/profile/account-info") ? "bg-primary-light-color" : "")}>
									اطلاعات حساب
								</Link>
								<Link href={"/user/profile/bank-info"} className={utils.cn("information p-2 radius-all-normal", isActive("/user/profile/bank-info") ? "bg-primary-light-color" : "")}>
									اطلاعات بانکی
								</Link>
							</div>
							<div className="px-4">
								<Button className="w-100 py-2 px-4" variant="destructive">
									<span>خروج از حساب کاربری</span>
									<i className="icon icon-export-1"></i>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</UserLayout>
	);
}
