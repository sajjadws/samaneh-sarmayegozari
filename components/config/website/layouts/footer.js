const moduleFooterConfigs = import.meta.glob(
    "/app/**/config/panel/footer.js",
    {
        eager: true,
        import: "default",
    }
);

const footerItems = Object.entries(moduleFooterConfigs).flatMap(([, items]) => items ?? []);

export function getFooterItems() {
    return footerItems;
}