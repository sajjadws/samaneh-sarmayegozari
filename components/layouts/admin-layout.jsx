"use client";
import { useState } from "react";
import Sidebar from "@/miz/components/react/sidebar/sidebar";
import Header from "@/miz/themes/react/components/header/header";

export default function AdminLayout({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <main className="d-flex w-100">
        <Sidebar role={globalThis.getRole("admin")} />
        {children}
      </main>
    </>
  );
}
