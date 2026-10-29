# Utility Class Reference

This page maps utility categories; it is not an exhaustive fixed list of generated classes. Final classes depend on configuration and Sass build order.

## Display

Values are defined in `sass/kernel/responsive/layouts/_displays.scss`:

```text
block, none, flex, grid, inline-block
```

The class prefix is `d`; a responsive name looks like `d-md-none`. Check the target build configuration for responsive behavior.

## Flex and alignment

`layouts/_flex.scss` generates classes for these properties:

- `flex-direction`: `row`, `row-reverse`, `column`, `column-reverse`
- `justify-content`
- `justify-self`
- `justify-items`
- `align-content`
- `align-self`
- `align-items`
- `flex-wrap`: `wrap`, `nowrap`

Prefixes are defined in `$class-list`. Most properties use a matching prefix; `flex-direction` and `flex-wrap` use `flex`. Structural examples include `flex-row`, `justify-content-center`, and `align-items-center`. Responsive classes place the breakpoint between prefix and value, for example `flex-md-column`.

Other generated classes include:

- `col-*`: column width in `.row`
- `grow-*`: `flex` value based on `conf-grows`
- `order-*`: flex order based on `conf-orders`
- `grid-*`: grid column count based on `conf-grids`

## Dimensions and position

- `w-*` and `h-*`: percentage width and height
- `w-100vw` and related values; `h-100vh` and related values
- `w-fit-content` and `h-fit-content`
- top, bottom, left, right, and logical inset classes from their respective generators

See [dims.md](./dims.md) for suffixes and percentage values.

## Spacing

`p`, `pt`, `pb`, `pl`, `pr`, `px`, `py`, `pis`, `pie`, `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my`, `mis`, `mie`, `gap`, `g`, `gx`, `gy`, `ls`, `lh`.

Property definitions and value calculations are documented in [space.md](./space.md).

## Colors

The generator in `sass/kernel/responsive/boots/_colors.scss` uses the `$colors`, `$backgrounds`, and `$borders` lists. Common patterns include:

- `<color-key>-color`
- `bg-<background-key>-color`
- `border-<border-key>-color`

For example, if `primary` exists in the relevant list and palette, corresponding classes such as `primary-color` and `bg-primary-color` are generated. Exact names can differ according to the rules that remove the `-background` suffix or `border-` prefix; inspect the generated selector in Sass or final CSS.

## Typography

`sass/kernel/responsive/boots/_typography.scss` generates classes for:

- Font sizes with the default `txt-size` prefix and names from typography configuration, such as `txt-size-normal`
- Font weights such as `font-weight-medium` and `font-weight-bold`
- Text alignment, transform, decoration, and decoration style
- Font style, white space, text wrap, and list style
- Font family classes with the `font-` prefix for configured fonts

Base size names in `sass/config/_typography.scss` include `small`, `subtitle`, `normal`, `title`, `mid-title`, `high-title`, `big-title`, and `extra-title`.

## Borders and radius

In `sass/kernel/responsive/boots/_border.scss`:

- Border widths: `bw-0` through `bw-10`, in pixels
- Border styles with prefixes such as `border-style`, `bt-style`, `bx-style`, `by-style`, `bl-style`, `br-style`, `bb-style`, `bis-style`, and `bie-style`
- Radius classes use the `radius` prefix and positions such as `all`, `tl`, `tr`, `bl`, `br`, `ss`, `se`, `es`, and `ee`

No-border classes such as `.border-none` and directional variants are defined in `layouts/_borders.scss`.

## Common utilities

Files in `sass/kernel/common/` forward utilities including:

- `aspect-ratio`
- `background`, `colors`, `cursor`
- `ellipsis`, `image`, `inset-inline`
- `opacity`, `overflow`, `position`
- `scroll-behavior`, `user-select`, `visibility`, `z-index`

Check the relevant source file and configuration for exact class names and generated ranges.

## Usage rule

If a class listed here is missing from a build, check: Is its file forwarded by a barrel? Does the configuration enable the value? Does the target entrypoint actually import that Sass?
