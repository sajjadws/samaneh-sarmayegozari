import {
  IconLayoutDashboard,
  IconUser,
  IconFileDescription,
  IconMessageCircle,
  IconReceipt,
  IconChartBar,
  IconWallet,
  IconSettings,
} from "@tabler/icons-react";

const sidebarAdminItems = [
  {
    id: 1,
    order: 0,
    label: "داشبورد",
    icon: IconLayoutDashboard,
    link: "/",
    role: "admin",
  },
  {
    id: 2,
    order: 1,
    label: "کاربران",
    icon: IconUser,
    link: "routes.panel.myProjects",
    role: "admin",
  },
  {
    id: 3,
    order: 2,
    label: "طرح ها",
    icon: IconFileDescription,
    link: "routes.panel.myProjects",
    role: "admin",
  },
  {
    id: 4,
    order: 3,
    label: "تیکت ها",
    icon: IconMessageCircle,
    link: "routes.panel.myProjects",
    role: "admin",
  },
  {
    id: 5,
    order: 4,
    label: "مدیریت لاگ‌ها",
    icon: IconReceipt,
    link: "routes.panel.myProjects",
    role: "admin",
  },
  {
    id: 6,
    order: 5,
    label: "گزارش ها",
    icon: IconChartBar,
    link: "routes.panel.myProjects",
    role: "admin",
  },
  {
    id: 7,
    order: 6,
    label: "مدیریت مالی",
    icon: IconWallet,
    link: "routes.panel.myProjects",
    role: "admin",
  },
  {
    id: 8,
    order: 7,
    label: "تنظیمات",
    icon: IconSettings,
    link: "routes.panel.myProjects",
    role: "admin",
  },
];

export function getSidebarItems() {
  return sidebarAdminItems;
}

export default sidebarAdminItems;
