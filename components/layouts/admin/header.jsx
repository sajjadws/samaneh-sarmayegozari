"use client";

import { getHeaderItems } from "@/components/config/website/layouts/header";
import "./header.css";
import "@/lib/globals-client";
import { Button } from "@/miz/themes/react/components/button/page";
import { useEffect } from "react";

export default function Header({ role, theme, setTheme }) {
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
				{/* <nav className="d-flex gap-7 align-items-center">
					{
						items.map((item) => (
							<a href={item.link} key={item.link}>{item.label}</a>
						))
					}
				</nav> */}
			</div>
			<div className="d-flex align-items-center gap-6">
				<input type="checkbox" checked={(theme == "light") ? true : false} onChange={(event) => handelThemeWebSite(event)}/>
				<i className="icon icon-setting-2 txt-size-mid-title"></i>
				<div className="position-relative">
					<i className="icon icon-notification txt-size-mid-title"></i>
					<span className="badge bg-danger-regular-color aspect-ratio-1x1 radius-all-full h-50 d-flex justify-content-center align-items-center txt-size-small white-color position-absolute top-0 inset-start-0">3</span>
				</div>
				<div className="d-flex gap-2 align-items-center">
					<div className="d-flex flex-column ">
						<span className="text-color">test</span>
						<span className="secondary-text-color">test</span>
					</div>
					<img className="radius-all-full" src={globalThis.getAssets("media/images/پروفایل.png")} alt="" />
				</div>
			</div>
		</header>
	);
}
