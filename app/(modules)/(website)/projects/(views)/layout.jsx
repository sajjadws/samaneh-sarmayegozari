"use client";

import { useState } from "react";
import Footer from "@/components/layouts/website/footer";
import Header from "@/components/layouts/website/header";

export default function ProjectsLayout({ children }) {
	const [theme, setTheme] = useState("light");

	return (
		<>
			<Header theme={theme} setTheme={setTheme} />
			<main>
				{children}
			</main>
			<Footer />
		</>
	);
}
