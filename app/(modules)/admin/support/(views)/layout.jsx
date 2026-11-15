"use client";
import { useState } from "react";
import Sidebar from "@/components/layouts/admin/sidebar";
import Header from "@/components/layouts/admin/header";

export default function ProjectsLayout({ children }) {
	const [theme, setTheme] = useState("light");

	return (
		<>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				{/* <Sidebar role={globalThis.getRole("admin")}/> */}
				{children}
			</main>
			
		</>
	);
}
