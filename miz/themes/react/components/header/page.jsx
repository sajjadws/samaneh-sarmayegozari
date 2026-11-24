"use client";

// import { getHeaderItems } from "@/components/config/website/layouts/header";
// import "./header.css";
import "@/lib/globals";
import { Button } from "@/miz/themes/react/components/button/page";
import { useEffect } from "react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../avatar/page";
import { IconBell, IconNotification, IconNotificationOff, IconSettings, IconSun } from "@tabler/icons-react";
export default function Header({ role, theme, setTheme }) {
  // const items = getHeaderItems().sort((a,b) => a.order - b.order);
  function handelThemeWebSite(event) {
    setTheme(event.target.checked ? "light" : "dark");
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="header bg-on-primary-color d-flex justify-content-space-between align-items-center w-100">
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
        <input
          type="checkbox"
          checked={theme == "light" ? true : false}
          onChange={(event) => handelThemeWebSite(event)}
        />
        <label>
        <div className="theme d-flex justify-content-center align-items-center radius-all-full bg-card-color">
          <div className="theme-icon bg-secondary-color radius-all-full w-100 h-100 d-flex justify-content-center align-itemes-center">
            <IconSun className="header-title-text-color" />
          </div>
        </div>
        </label>

        <div className="position-relative">
          <IconBell size={26}/>
          <span className="badge bg-danger-regular-color aspect-ratio-1x1 radius-all-full d-flex justify-content-center align-items-center txt-size-small white-color position-absolute inset-start-0 top-0 h-50">
            3
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex flex-column align-items-end">
            <span className="text-color">مدیر سیستم</span>
            <span className="secondary-text-color">مدیر کل</span>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-6">
            <Avatar>
              <AvatarImage src={globalThis.getAssets("media/images/پروفایل.jpg")} alt="" className="radius-all-full" />
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
