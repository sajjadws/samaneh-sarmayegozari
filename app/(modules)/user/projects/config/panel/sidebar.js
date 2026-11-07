import { routes } from "@/lib/routes/routes";

const sidebarProjectItems = [
    {
        order: 0,
        label: "projects",
        link: routes.panel.projects,
        role: "user"
    },
    {
        order: 1,
        label: "user projects",
        link: routes.panel.myProjects,
        role: "user"
    },
];

export default sidebarProjectItems;