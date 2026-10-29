import SessionSidebar from "@/components/session-aside";
import Header from "@/components/panel/header";
import { Suspense } from "react";
import "@/public/modules/projects/css/projects.css";

export default async function ProjectLayout({ children }) {

  return (
    <div className="my-projects-page" dir="rtl">
      <Suspense>
        <Header />
      </Suspense>

      <div className="my-projects-layout">
        <Suspense>
          <SessionSidebar/>
        </Suspense>

        <div className="min-w-0 flex-1 my-projects-main">{children}</div>
      </div>
    </div>
  );
}