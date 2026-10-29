# MIZ Architecture and Structure

## Overview

MIZ is organized into several layers:

1. **Configuration**: breakpoints, colors, dimensions, fonts, and asset paths.
2. **Sass functions**: transform configuration into class names and CSS values.
3. **Kernel**: framework-wide utilities and rules.
4. **Themes**: visual configuration and theme-specific components.
5. **Components**: independent UI elements that use utilities, tokens, and their own CSS.

## Directory structure

```text
miz/
├── _index.scss
├── sass/
│   ├── _index.scss
│   ├── config/
│   ├── global-functions/
│   └── kernel/
│       ├── common/
│       ├── kernel-functions/
│       └── responsive/
└── themes/
    ├── _index.scss
    ├── config.js
    ├── mizoon/
    └── react/
```

### Entrypoints and forwards

- `miz/_index.scss` forwards the Sass and themes branches.
- `miz/sass/_index.scss` loads configuration, global functions, and the kernel.
- `miz/sass/kernel/_index.scss` forwards the responsive, common, and kernel-functions modules.
- `miz/sass/kernel/responsive/_index.scss` forwards mixins, layouts, boots, and class-generation functions.
- `miz/themes/_index.scss` currently forwards only the React theme.
- `miz/themes/react/_index.scss` forwards the React components and configuration.

A directory existing in the source does not mean it is exported or compiled by the main entrypoint. Before adding a module, inspect the actual barrels and build entrypoints.

## Sass layers

### `sass/config`

Framework-wide settings are defined here, including:

- `responsive`: breakpoints and class-generation maps
- `dims`: radius, opacity, z-index, and aspect ratio
- `colors`: palettes and color keys
- `typography`: fonts and type sizes
- `paths`: asset paths
- `reset` and `icon`: related settings and behavior

### `sass/global-functions`

Contains functions usable by themes and consumers. For example, `get-break-point-value($break-point)` reads a breakpoint value from the configuration map.

### `sass/kernel/common`

Provides general utilities such as opacity, overflow, position, z-index, aspect ratio, ellipsis, images, visibility, cursor, scroll behavior, and inline-direction support.

### `sass/kernel/responsive`

Contains responsive utility generation:

- `functions/`: builds class names and property/value maps
- `layouts/`: display, flex, grid, dimensions, order, and border utilities
- `boots/`: generates final responsive, color, border, and typography CSS
- `mixins/`: CSS variables and helper mixins

## Utility generation flow

The general flow is:

1. A configuration map is defined in `sass/config` or in a theme configuration.
2. A function in `kernel/responsive/functions` builds the class list and corresponding CSS values.
3. Class categories are collected in `$total-list` in `boots/_responsive.scss`.
4. The `check-break-point` and `generate-style-property` mixins emit base rules or media-query rules.
5. Sass produces the final output.

When changing a utility, locate its generator and configuration first. Adding a selector manually may not match the generation system or its breakpoint behavior.

## Text direction

MIZ uses both physical properties such as `margin-left` and logical properties such as `margin-inline-start`. For multilingual layouts, prefer logical properties and their corresponding classes (`mis`, `mie`, `pis`, or `pie`) where possible. The `.rtl` and `.ltr` classes are also defined in `kernel/responsive/layouts/_layouts.scss`.

## Export boundaries

The source contains React and Mizoon themes, but their exports differ. A configuration or component in one theme is not automatically available in the other. See [themes.md](./themes.md) for details.
