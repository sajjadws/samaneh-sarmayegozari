# MIZ Configuration

## Configuration model

Many utility classes are generated from Sass maps. Common map settings include:

| Key | Purpose |
|---|---|
| `count` | Number of steps or maximum generated suffix |
| `unit` | CSS value unit, such as `rem` |
| `factor` | Converts a class suffix into a CSS value |
| `responsive` | Generates breakpoint variants instead of only a base class |

The exact meaning of each key depends on the consuming generator. Inspect that generator when changing a configuration value.

## Default breakpoints

The map in `sass/config/_responsive.scss` is ordered as follows:

| Name | Value |
|---|---:|
| `xxl` | `1920px` |
| `xl` | `1280px` |
| `lg` | `1024px` |
| `md` | `767px` |
| `sm` | `478px` |

Values in the header and section spacing lists must align with the breakpoint order; generators access these lists by index.

## Default responsive settings

In `sass/config/_responsive.scss`:

- `conf-cols`: 12 columns, responsive
- `conf-width` and `conf-height`: 50 steps, responsive
- `conf-top`, `conf-bottom`, `conf-inset-inline-start`, and `conf-inset-inline-end`: 50 steps, responsive
- `conf-left` and `conf-right`: 4 steps, responsive
- `conf-grids`: 14 steps, responsive
- `conf-orders`: 10 steps, responsive
- `conf-grows`: 5 steps, responsive
- `conf-line-height`: 25 steps, `rem` unit, `0.25` factor, responsive
- `conf-gaps`, `conf-paddings`, `conf-margins`, and `conf-letter-spacing`: 25 steps, `rem` unit, `0.5` factor, responsive

For the full list of flex, text, and display properties and their `responsive` settings, consult the configuration file.

## General and non-responsive settings

In `sass/config/_dims.scss`:

- Radius values: `extra-small: 2px`, `small: 5px`, `normal: 10px`, `medium: 16px`, `large: 25px`, `extra-large: 50px`, `full: 1000px`, and `none: 0px`
- Opacity factor: `0.1`
- Ellipsis count: `10`
- Z-index range: 0 through 10, step 1
- Aspect ratio: numerator 4, denominator 3, step 1
- Maximum border thickness: `10`

These are base values; a theme can override them with `map.merge`.

## Changing configuration

For settings overridden by a target theme, follow the `map.merge` pattern in `themes/react/config/_responsive.scss` and `themes/react/config/_dims.scss`. When overriding:

1. Merge only the required keys to preserve the rest of the configuration.
2. Verify that the generator actually uses the final theme map.
3. If the number of breakpoints changes, keep dependent spacing lists aligned.
4. Compile Sass and inspect the generated classes.

## Palettes and CSS variables

- The base palette is defined in `sass/config/_colors.scss`.
- React settings in `themes/react/config/_colors.scss` are merged with the base palette.
- The color generator in `sass/kernel/responsive/boots/_colors.scss` creates text, background, and border color classes.
- `sass/kernel/responsive/mixins/_variables.scss` generates root CSS variables.

A palette key alone does not guarantee that a corresponding class is generated; this also depends on the `$colors`, `$backgrounds`, and `$borders` lists. When adding a color, check both the palette and the consuming lists.

## Fonts and asset paths

- Font sizes and font definitions are in `sass/config/_typography.scss`.
- Font and other asset paths are in `sass/config/_paths.scss`.
- `boots/_typography.scss` uses configuration for `@font-face` rules and typography utilities.
- Final font URLs depend on the CSS output location and `$fonts-path`; verify generated URLs after moving build output.

## Build configuration

`themes/config.js` declares:

```js
export const config = {
    theme: 'react',
    output: `/assets/js/mizchin.min.js`,
};
```

This file provides theme-related build/runtime settings; it does not replace Sass configuration. Before changing the output, also find where the build tooling consumes this config.
