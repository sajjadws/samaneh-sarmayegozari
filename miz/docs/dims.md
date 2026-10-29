# Dimensions, Columns, and Grid

This document describes dimension utilities visible in the kernel. Final class names and counts are determined by configuration and generators.

## Percentage-based width and height

In `sass/kernel/responsive/layouts/_dims.scss`, `w-*` and `h-*` classes are generated from `conf-width` and `conf-height`. The base configuration uses `count: 50` and `start-from-zero: true`; the generator calculates and rounds percentages:

```text
w-0  → width: 0%
w-25 → width: 50%
w-50 → width: 100%
h-25 → height: 50%
```

Conceptually, the formula is `round((100 / count) × suffix)%`. Changing `count` also changes the suffix corresponding to a percentage.

Hand-written classes include:

- `.w-100vw`، `.w-75vw`، `.w-50vw`، `.w-25vw`، `.w-0vw`
- `.h-100vh`، `.h-75vh`، `.h-50vh`، `.h-25vh`، `.h-0vh`
- `.w-fit-content` and `.h-fit-content`

## Flex columns

In `sass/kernel/responsive/layouts/_flex.scss`, `col-*` classes are generated from `conf-cols`. The default count is 12, and each column width is calculated using the grid width and the `--gx` variable:

```scss
calc(calc(100 / 12 * <column-count> * 1%) - var(--gx))
```

`.row` is a flex container with `flex-wrap: wrap` and initializes `--gx` to zero. If you apply a horizontal gap to columns, inspect its effect on `--gx` and the calculated column widths in the CSS.

## Grid template columns

In `sass/kernel/responsive/layouts/_grid.scss`, grid classes are generated from `conf-grids`; the base value is `count: 14` with `responsive: true`. For the `grid` type, the general function uses `repeat(n, 1fr)`. For example, the class corresponding to 3 conceptually produces `grid-template-columns: repeat(3, 1fr)`; derive the exact responsive class name from the conventions in [responsive.md](./responsive.md).

## Position and inset

The following settings in `sass/config/_responsive.scss` control class counts and responsiveness:

- `top` and `bottom`: count 50
- `left` and `right`: count 4
- `inset-inline-start` and `inset-inline-end`: count 50

These settings describe generation configuration only. For exact prefixes and units, inspect the position and inset generators in `sass/kernel/common/` and the class list in `boots/_responsive.scss`.

## Base layouts

In `sass/kernel/responsive/layouts/_layouts.scss`:

- `.section`: 100% width, column flex, centered
- `.container`: column flex, aligned to the start
- `.block`: row flex
- `.div`: basic flex
- `.rtl` and `.ltr`: set `direction`
- `.border-box` and `.content-box`: set `box-sizing`

The responsive boot also generates padding values for `.header` and `.section` from the header and boxed lists. `.section.wide` sets left and right padding to zero with `!important`.
