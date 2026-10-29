import { Suspense } from "react";
import ProjectContent from "./components/project-content";

export default function ProjectsPage({searchParams}) {
    return (
        <>
            <Suspense>
                <ProjectContent searchParams={searchParams}/>
            </Suspense>
        </>
    );
}