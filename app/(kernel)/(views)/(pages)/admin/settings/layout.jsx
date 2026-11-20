// "use client";
// import { useState } from "react";
// import Footer from "@/components/layouts/website/footer";
import Header from "@/components/layouts/admin/header";
import Sidebar from "@/components/layouts/admin/sidebar";
import UserLayout from "@/app/(kernel)/layouts/user-panel";
import { PERMISSIONS } from "@/lib/rbac/permissions";

export default function UsersLayout({ children }) {
    // const [theme, setTheme] = useState("light");

    return (
        // <>
        //     <Header theme={theme} setTheme={setTheme} />
        //     <main>
        //         <Sidebar role={globalThis.getRole("admin")}/>
        //         {children}
        //     </main>
        //     {/* <Footer /> */}
        // </>
        <>
            <UserLayout permission={PERMISSIONS.USERS.READ}>
                {children}
            </UserLayout>
        </>
    );
}
