const moduleSidebarConfigs = import.meta.glob(
    "/app/**/config/panel/sidebar.js",
    {
        eager: true,
        import: "default",
    }
);

const sidebarItems = Object.entries(moduleSidebarConfigs).flatMap(([, items]) => items ?? []);

export function getSidebarItems() {
    return sidebarItems;
}