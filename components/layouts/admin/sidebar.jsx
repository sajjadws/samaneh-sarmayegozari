"use client";

import { useEffect, useState } from "react";
import "@/lib/globals-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSidebarItems } from "@/components/config/admin/layouts/sidebar";
import "./sidebar.css";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/miz/components/react/collapsible/page";

export default function Sidebar({ role, ...props }) {
	const pathname = usePathname();

	const [isClosed, setIsClosed] = useState(false);
	const [isOpening, setIsOpening] = useState(false);
	const [hiddenTitles, setHiddenTitles] = useState(() => new Set());

	const { asideClassName, titleClassName, linkClassName } = props;

	const items = [...getSidebarItems()]
		.filter((item) => {
			return globalThis.getRole(item.role) === globalThis.getRole(role);
		})
		.sort((a, b) => a.order - b.order);

	const allItems = flattenSidebarItems(items);

	const activeHref = allItems
		.filter((item) => {
			return pathname === item.link || pathname.startsWith(`${item.link}/`);
		})
		.sort((a, b) => b.link.length - a.link.length)[0]?.link;

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 768px)");

		function handleScreenChange(event) {
			if (event.matches) {
				setIsClosed(false);
				setIsOpening(true);
				setHiddenTitles(new Set());
			}
		}

		handleScreenChange(mediaQuery);

		mediaQuery.addEventListener("change", handleScreenChange);

		return () => {
			mediaQuery.removeEventListener("change", handleScreenChange);
		};
	}, []);

	function flattenSidebarItems(items = []) {
		return items.flatMap((item) => [item, ...flattenSidebarItems(item.subList ?? [])]);
	}

	function isActive(href) {
		return pathname === href || pathname.startsWith(`${href}/`);
	}

	function handleCloseSideBar() {
		if (window.matchMedia("(max-width: 768px)").matches) {
			return;
		}
		if (isClosed) {
			setHiddenTitles(new Set());

			setIsClosed(false);
			setIsOpening(true);
		} else {
			setIsOpening(false);
			setIsClosed(true);
		}
	}

	function handleTitleAnimationEnd(event, itemLink) {
		if (event.target !== event.currentTarget) return;

		if (event.animationName === "FadeOut" && isClosed) {
			setHiddenTitles((previous) => {
				const next = new Set(previous);
				next.add(itemLink);
				return next;
			});
		}
	}
	const [isOpen, setIsOpen] = useState(false);
	return (
		<aside className={utils.cn("sidebar d-flex flex-column gap-3 p-3 bg-primary-color align-items-md-center", asideClassName, isClosed && "close", isOpening && "opening")}>
			<i className="icon icon-menu-1 txt-size-mid-title on-primary-color" onClick={handleCloseSideBar} />

			{items.map((item) =>
				item.subList?.length > 0 ? (
					<Collapsible key={item.link} open={isOpen} onOpenChange={setIsOpen} className="d-flex flex-column gap-2">
						<CollapsibleTrigger
							nativeButton={false}
							render={
								<div className={utils.cn("link-item d-flex align-items-center p-2 gap-2 radius-all-normal overflow-hidden", linkClassName, isActive(item.link) ? "bg-on-primary-color primary-color" : "on-primary-color")}>
									<i className={utils.cn("icon", item.icon, "txt-size-mid-title")} />

									<span className={utils.cn("title txt-size-normal d-md-none", titleClassName, hiddenTitles.has(item.link) ? "d-none" : "d-inline")} onAnimationEnd={(event) => handleTitleAnimationEnd(event, item.link)}>
										{item.label}
									</span>

									<i className={utils.cn("icon icon-arrow-left-2 txt-size-mid-title")} />
								</div>
							}
						/>

						<CollapsibleContent className="d-flex flex-column gap-2">
							{item.subList.map((subItem) => (
								<Link key={subItem.link} href={subItem.link} className={utils.cn("link-item d-flex align-items-center p-2 gap-2 radius-all-normal overflow-hidden w-80", linkClassName, isActive(subItem.link) ? "bg-on-primary-color primary-color" : "on-primary-color")}>
									<i className={utils.cn("icon", subItem.icon, "txt-size-mid-title")} />

									<span className={utils.cn("title txt-size-subtitle d-md-none", titleClassName, hiddenTitles.has(subItem.link) ? "d-none" : "d-inline")} onAnimationEnd={(event) => handleTitleAnimationEnd(event, subItem.link)}>
										{subItem.label}
									</span>
								</Link>
							))}
						</CollapsibleContent>
					</Collapsible>
				) : (
					<Link key={item.link} href={item.link} className={utils.cn("link-item d-flex align-items-center p-2 gap-2 radius-all-normal overflow-hidden", linkClassName, isActive(item.link) ? "bg-on-primary-color primary-color" : "on-primary-color")}>
						<i className={utils.cn("icon", item.icon, "txt-size-mid-title")} />

						<span className={utils.cn("title txt-size-normal d-md-none", titleClassName, hiddenTitles.has(item.link) ? "d-none" : "d-inline")} onAnimationEnd={(event) => handleTitleAnimationEnd(event, item.link)}>
							{item.label}
						</span>
					</Link>
				),
			)}
		</aside>
	);
}