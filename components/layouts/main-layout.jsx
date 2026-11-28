"use client";
import { useState } from "react";
import Sidebar from "@/miz/components/react/sidebar/sidebar";
import Header from "@/miz/themes/react/components/header/header";

export default function AdminLayout({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <main className="d-flex w-100 overflow-hidden">
        <Sidebar role="admin" />
        <section className="bg-color scrollbar-width-none w-100 overflow-scroll px-8 py-10">{children}</section>
      </main>
    </>
  );
}
