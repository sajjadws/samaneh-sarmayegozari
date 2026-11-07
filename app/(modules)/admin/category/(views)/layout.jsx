"use client";
import { useState } from "react";
import Footer from "@/components/layouts/website/footer";
import Header from "@/components/layouts/website/header";
import Sidebar from "@/components/layouts/admin/sidebar";

export default function CategoriesLayout({ children }) {
	const [theme, setTheme] = useState("light");

	return (
		<>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<Sidebar role={globalThis.getRole("admin")}/>
				{children}
			</main>
			<Footer />
		</>
	);
}
