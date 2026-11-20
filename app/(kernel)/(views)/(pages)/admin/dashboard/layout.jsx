// "use client";
// import { useState } from "react";
// import Footer from "@/components/layouts/website/footer";
import Header from "@/components/layouts/admin/header";
import Sidebar from "@/components/layouts/admin/sidebar";
import UserLayout from "@/app/(kernel)/layouts/user-panel";

export default function UsersLayout({ children }) {
    return (
        <>
            <UserLayout>
                {children}
            </UserLayout>
        </>
    );
}
