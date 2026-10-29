# Themes

## Separation

Each theme can have its own configuration, components, and Sass. Changing a palette or utility in one theme does not necessarily affect another.

Current structure:

```text
themes/
├── _index.scss
├── config.js
├── mizoon/
│   ├── _index.scss
│   ├── config/
│   └── components/
└── react/
    ├── _index.scss
    ├── config/
    └── components/
```

## React theme

`themes/react/_index.scss` forwards the `components` and `config` modules. The current component barrel in `themes/react/components/_index.scss` includes button, card, table, and data-table.

React configuration files include:

- `_colors.scss`: React palette merged with the base palette using `map.merge`
- `_responsive.scss`: spacing configuration overrides
- `_dims.scss`: dimension configuration overrides
- `_typography.scss`: typography settings
- `_component.scss`: component-related values

React components can reuse kernel utilities with `@extend`. Before extending a utility in a component, inspect that component's imports and verify that the selector exists.

## Mizoon theme

`themes/mizoon/` contains configuration, Sass components, and HTML/JavaScript examples. The component list is in `themes/mizoon/components/_index.scss` and includes accordion, badge, breadcrumb, button, card, dropdown, form-control, modal, nav, offcanvas, pagination, progress, radio-checkbox, range, select, tab, table, tooltip, and others.

Despite Mizoon having its own barrel, `themes/_index.scss` currently forwards only `react`. Do not assume Mizoon is available through the main Sass import without checking the build entrypoint.

## Selecting a theme in the build

`themes/config.js` declares `theme: 'react'` and an output path. To change themes, also find where the build tooling reads this config and which Sass import paths it uses. Changing the config value alone does not guarantee that entrypoints or exports will change.

## Creating a theme

1. Use the closest existing theme as a reference for configuration and barrel structure.
2. Override only the required base settings with `map.merge`.
3. Add imports and forwards to the theme barrels and build entrypoint.
4. Keep component styles inside the theme so they do not leak into unrelated theme output.
5. Build Sass and inspect generated selectors and CSS variables.

## Sass module system considerations

Some kernel files import both base configuration and React configuration. When changing identically named variables across modules, validate actual Sass behavior with the target build; do not assume modules are automatically merged or overridden.
