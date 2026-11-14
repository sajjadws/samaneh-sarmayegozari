import { routes } from "@/lib/routes/routes";

const sidebarUserItems = [
    {
        order: 1,
        label: "کاربران",
        icon: "icon-frame-1",
        link: routes.admin.panel.userManagement.root,
        role: "admin",
    },
];

export default sidebarUserItems;
