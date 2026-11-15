"use client";
import { useState } from "react";
import Sidebar from "@/components/layouts/admin/sidebar";
import Header from "@/components/layouts/admin/header";


export default function ProjectsLayout({ children }) {
	const [theme, setTheme] = useState("light");

	return (
<<<<<<< HEAD:app/(modules)/admin/support/(views)/(pages)/logs/layout.jsx
		<section className="w-100">
			{children}
		</section>
=======
		<>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				<Sidebar role={globalThis.getRole("admin")}/>
				{children}
			</main>
		
		</>
>>>>>>> 44ec393d8eee2cab5c575b47407e0fedc62db584:app/(modules)/user/project/(views)/layout.jsx
	);
}
