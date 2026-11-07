import { Suspense } from "react";
import ProjectsContent from "./components/project-content";

export default function ProjectsPage({searchParams}) {
    return (
        <>
            <Suspense>
                <ProjectsContent searchParams={searchParams}/>
            </Suspense>
        </>
    );
}