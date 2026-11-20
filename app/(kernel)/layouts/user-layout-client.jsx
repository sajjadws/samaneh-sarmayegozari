"use client";

import { useState } from "react";
import Sidebar from "@/components/layouts/admin/sidebar";
import Header from "@/components/layouts/admin/header";

export default function UserLayoutClient({ children, access }) {
    const [theme, setTheme] = useState("light");

    return (
        <>
            <Header theme={theme} setTheme={setTheme} />

            <main className="bg-color">
                <Sidebar
                    permissions={access.permissions}
                    roles={access.roles}
                    isSuperAdmin={access.isSuperAdmin}
                />

                {children}
            </main>
        </>
    );
}