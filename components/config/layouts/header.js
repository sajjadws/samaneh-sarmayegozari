const moduleHeaderConfigs = import.meta.glob(
    "/app/(modules)/*/config/panel/header.js",
    {
        eager: true,
        import: "default",
    }
);

const headerItems = Object.entries(moduleHeaderConfigs).flatMap(([, items]) => items ?? []);

export function getHeaderItems() {
    return headerItems;
}