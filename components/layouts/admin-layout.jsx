"use client";
import { useState } from "react";
import Sidebar from "@/miz/components/react/sidebar/sidebar";
import Header from "@/miz/themes/react/components/header/header";
import { IconElevator } from "@tabler/icons-react";

export default function AdminLayout({ children }) {
	const [theme, setTheme] = useState("light");

	return (
		<>
			<Header theme={theme} setTheme={setTheme} />
			<main className="w-100 d-flex">
				<Sidebar role={globalThis.getRole("admin")}/>
				{children}
			</main>
			
		</>
	);
}
