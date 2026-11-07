"use client";

import { getHeaderItems } from "@/components/config/website/layouts/header";
import "./header.css";
import "@/lib/globals-client";
import { Button } from "@/miz/themes/react/components/button/page";
import { useEffect } from "react";

export default function Header({ theme, setTheme }) {
	const items = getHeaderItems().sort((a,b) => a.order - b.order);
	function handelThemeWebSite(event){
		setTheme((event.target.checked) ? "light" : "dark");
	}

	useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );
    }, [theme]);

	return (
		<header className="header-test w-100 bg-on-primary-color d-flex justify-content-space-between align-items-center">
			<div className="d-flex gap-11">
				<img src={globalThis.getAssets("/media/images/Logo.svg")} alt="" />
				<nav className="d-flex gap-7 align-items-center">
					{
						items.map((item) => (
							<a href={item.link} key={item.link}>{item.label}</a>
						))
					}
				</nav>
			</div>
			<div className="d-flex gap-7">
				<input type="checkbox" checked={(theme == "light") ? true : false} onChange={(event) => handelThemeWebSite(event)}/>
				<Button className="py-2 px-4">ورود / ثبت نام</Button>
			</div>
		</header>
	);
}
