"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import UserLayout from "@/app/(kernel)/layouts/user-panel";
import { Button } from "@/miz/themes/react/components/button/page";
import { getProfileSidebarData } from "../actions/profile";
import "../profile.css";
import { useRouter } from "next/navigation";

const PROFILE_BASE_PATH = "/user/profile";

export default function ProfileLayoutClient({ children }) {
	const params = useParams();
	const pathname = usePathname();
	const routeId = typeof params?.id === "string" ? params.id : undefined;

	const [profileData, setProfileData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		async function loadProfile() {
			setIsLoading(true);
			setProfileData(null);

			try {
				const result = await getProfileSidebarData(routeId);
				if (!cancelled) {
					setProfileData(result);
				}
			} catch {
				if (!cancelled) {
					setProfileData(null);
				}
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		}

		loadProfile();

		return () => {
			cancelled = true;
		};
	}, [routeId]);

	const profileId = profileData?.profileId;
	const profileHref = (section) => `${PROFILE_BASE_PATH}/${section}${profileId ? `/${profileId}` : ""}`;

	const isActive = (section) => {
		const href = profileHref(section);
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	const user = profileData?.user;
	const roleTitles =
		user?.userRoles
			?.map(({ role }) => role.title || role.name)
			.filter(Boolean)
			.join("، ") || "بدون نقش";

	const isActiveAccount = user?.status === "ACTIVE";

	const router = useRouter();

	return (
		<UserLayout>
			<section className="section justify-content-start align-items-start px-8 py-14">
				<div className="container w-100 gap-6">
					<div className="w-100 d-flex justify-content-space-between align-items-center">
						<h1 className="txt-size-high-title font-weight-bold title-text-color">پروفایل کاربری</h1>

						<div
							className="return-link cursor-pointer d-flex align-items-center gap-1 primary-color"
							onClick={() => router.back()}
						>
							<span className="txt-size-normal">بازگشت</span>
							<i className="icon icon-arrow-left txt-size-title" />
						</div>
					</div>

					<div className="block w-100 gap-6">
						<div className="body h-100 shadow-lg w-100 bg-card-color p-9 radius-all-normal d-flex flex-column gap-6">
							{children}
						</div>

						<aside className="profile h-100 shadow-lg w-38 bg-card-color py-5 px-6 radius-all-normal d-flex flex-column gap-6">
							<div className="d-flex gap-6 py-5 px-2 bw-1 bb-style-solid">
								{isLoading ? (
									<span>در حال دریافت اطلاعات کاربر...</span>
								) : user ? (
									<>
										<div className="d-flex flex-column gap-2 align-items-end">
											<h2 className="txt-size-mid-title primary-color font-weight-bold txt-white-space-nowrap">
												{[user.userUtilities?.firstName, user.userUtilities?.lastName]
													.filter(Boolean)
													.join(" ") || "بدون نام"}
											</h2>

											<span className="txt-size-title secondary-text-color">{roleTitles}</span>

											<div className="d-flex gap-1">
												<span className="txt-size-subtitle">وضعیت حساب:</span>
												<span
													className={utils.cn(
														"d-flex justify-content-center align-items-center px-2 radius-all-full white-color txt-size-small",
														isActiveAccount
															? "bg-success-regular-color"
															: "bg-danger-regular-color",
													)}
												>
													{isActiveAccount ? "فعال" : "غیرفعال"}
												</span>
											</div>
										</div>

										<img
											className="shadow-lg w-100 aspect-ratio-1x1 grow-1 radius-all-full border-on-primary-color bw-5 border-style-solid"
											src={user.image || "/media/images/default-profile.jpg"}
											alt={user.name || "تصویر پروفایل"}
										/>
									</>
								) : (
									<span>اطلاعات پروفایل در دسترس نیست.</span>
								)}
							</div>

							<nav className="information-list w-100 d-flex flex-column gap-5 primary-color txt-size-title px-4">
								<Link
									href={profileHref("personal-info")}
									className={utils.cn(
										"information p-2 radius-all-normal",
										isActive("personal-info") ? "bg-primary-light-color" : "",
									)}
								>
									اطلاعات شخصی
								</Link>

								<Link
									href={profileHref("account-info")}
									className={utils.cn(
										"information p-2 radius-all-normal",
										isActive("account-info") ? "bg-primary-light-color" : "",
									)}
								>
									اطلاعات حساب
								</Link>

								<Link
									href={profileHref("bank-info")}
									className={utils.cn(
										"information p-2 radius-all-normal",
										isActive("bank-info") ? "bg-primary-light-color" : "",
									)}
								>
									اطلاعات بانکی
								</Link>
							</nav>

							<div className="px-4">
								<Button className="w-100 py-2 px-4" variant="destructive" type="button">
									<span>خروج از حساب کاربری</span>
									<i className="icon icon-export-1" />
								</Button>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</UserLayout>
	);
}
