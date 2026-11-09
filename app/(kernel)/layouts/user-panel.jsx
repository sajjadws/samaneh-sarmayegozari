"use client";

import { useState } from "react";
import Sidebar from "@/components/layouts/admin/sidebar";
import Header from "@/components/layouts/admin/header";

export default function UserLayout({ children }) {
    const [theme, setTheme] = useState("light");

    return (
        <>
            <Header theme={theme} setTheme={setTheme} />
            <main className="bg-color">
                <Sidebar role={globalThis.getRole("user")}/>
                {children}
            </main>
            {/* <Footer /> */}
        </>
    );
}
