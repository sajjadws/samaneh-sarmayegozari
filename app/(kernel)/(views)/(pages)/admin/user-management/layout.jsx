// "use client";

// import UserLayout from "@/app/(kernel)/layouts/user-panel";
import { PERMISSIONS } from "@/lib/rbac/config/permissions";
// import { useRouter } from "next/navigation";

// import "./user.css";

// export default function UsersLayout({ children }) {
// 	const router = useRouter();

// 	return (
// 		// <>
// 		//     <Header theme={theme} setTheme={setTheme} />
// 		//     <main>
// 		//         <Sidebar role={globalThis.getRole("admin")}/>
// 		//         {children}
// 		//     </main>
// 		//     {/* <Footer /> */}
// 		// </>
// 		<>
// 			<UserLayout permission={PERMISSIONS.USERS.READ}>
// 				<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
// 					<div className="container w-100 h-100 gap-8">
// 						<div className="block w-100 align-items-center justify-content-space-between">
// 							<div className="block w-100 d-flex flex-column align-items-start gap-2">
// 								<h1 className="txt-size-mid-title title-text-color font-weight-bold">مدیریت کاربران</h1>
// 								<p className="txt-size-title secondary-text-color">
// 									مشاهده اطلاعات کاربران، بررسی وضعیت حساب و احراز هویت
// 								</p>
// 							</div>
// 							<div className="return-link d-flex align-items-center gap-1 primary-color cursor-pointer" onClick={() => router.back()}>
// 								<span className="txt-size-normal">بازگشت</span>
// 								<i className="icon icon-arrow-left txt-size-title" />
// 							</div>
// 						</div>
// 						<div className="block flex-column gap-3 w-100 h-100">
//                             {children}
// 						</div>
// 					</div>
// 				</section>
// 			</UserLayout>
// 		</>
// 	);
// }





import UserLayout from "@/app/(kernel)/layouts/user-panel";
import "./user.css";

export default function UsersLayout({ children }) {
    return (
        <UserLayout permission={PERMISSIONS.USERS.READ}>
            <section className="section justify-content-start align-items-start gap-8 px-8 py-10">
                <div className="container w-100 h-100 gap-8">
                    <div className="block w-100 d-flex flex-column align-items-start gap-2">
                        <h1 className="txt-size-mid-title title-text-color font-weight-bold">
                            مدیریت کاربران
                        </h1>

                        <p className="txt-size-title secondary-text-color">
                            مشاهده اطلاعات کاربران، بررسی وضعیت حساب و احراز هویت
                        </p>
                    </div>

                    {children}
                </div>
            </section>
        </UserLayout>
    );
}
