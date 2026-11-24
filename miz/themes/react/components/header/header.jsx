"use client";

// import { getHeaderItems } from "@/components/config/website/layouts/header";
// import "./header.css";
import "@/lib/globals";
import { Button } from "@/miz/themes/react/components/button/page";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../avatar/page";
import { IconBell, IconMoon, IconSun } from "@tabler/icons-react";
export default function Header({ role, theme, setTheme }) {
    const [isDark, setIsDark] = useState(false);

  function handelThemeWebSite(event) {
    setTheme(event.target.checked ? "light" : "dark");
    setIsDark((prev) => !prev);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="header bg-menu-color d-flex justify-content-space-between align-items-center w-100">
      <div className="d-flex gap-11">
        {isDark ? 
          <img src={globalThis.getAssets("/media/images/Logo-dark.png")} alt="" /> :
          <img src={globalThis.getAssets("/media/images/Logo.png")} alt="" />
        }
      </div>
      <div className="d-flex align-items-center gap-6">
        <input
          type="checkbox"
          checked={theme == "light" ? true : false}
          onChange={(event) => handelThemeWebSite(event)}
          id="theme"
          hidden
        />
        <label htmlFor="theme">
          <div className="theme d-flex justify-content-center align-items-center radius-all-full ">
            <div className="theme-icon bg-secondary-color radius-all-full d-flex justify-content-center align-items-center">
              {isDark ? <IconMoon color="white" size={20} /> : <IconSun size={20} color="white"/>}
            </div>
          </div>
        </label>


        <div className="position-relative">
          {isDark ? <IconBell color="white" size={30} /> : <IconBell size={30} />}
          <span className="badge bg-danger-regular-color aspect-ratio-1x1 radius-all-full d-flex justify-content-center align-items-center txt-size-small white-color position-absolute inset-start-0 top-0 h-50">
            3
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex flex-column align-items-end">
            <span className="text-color txt-size-normal">مدیر سیستم</span>
            <span className="secondary-text-color txt-size-subtitle">مدیر کل</span>
          </div>

          <div className="d-flex align-items-center flex-wrap gap-6">
            <Avatar>
              <AvatarImage src={globalThis.getAssets("media/images/پروفایل.jpg")} alt="" className="radius-all-full" />
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
