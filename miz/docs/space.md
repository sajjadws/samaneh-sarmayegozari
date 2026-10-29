# Spacing Utilities

## Generation source

Names and property maps are defined in `sass/kernel/responsive/functions/_space.scss`. Count, factor, and unit are configured in `sass/config/_responsive.scss` and sometimes overridden by a theme. Classes use numeric suffixes; the CSS value is derived from `factor × suffix` with the configured `unit`.

With the default `factor: 0.5` and `unit: rem`:

```text
p-4  → padding: 2rem
mt-3 → margin-top: 1.5rem
gap-2 → gap: 1rem
```

This conversion applies to settings that define a factor and unit; check the final configuration for the target theme.

## Padding

| Prefix | Property |
|---|---|
| `p` | `padding` |
| `pt` | `padding-top` |
| `pb` | `padding-bottom` |
| `pl` | `padding-left` |
| `pr` | `padding-right` |
| `px` | left and right |
| `py` | top and bottom |
| `pis` | `padding-inline-start` |
| `pie` | `padding-inline-end` |

## Margin

| Prefix | Property |
|---|---|
| `m` | `margin` |
| `mt` | `margin-top` |
| `mb` | `margin-bottom` |
| `ml` | `margin-left` |
| `mr` | `margin-right` |
| `mx` | left and right |
| `my` | top and bottom |
| `mis` | `margin-inline-start` |
| `mie` | `margin-inline-end` |

## Gap and column gap

| Prefix | Property |
|---|---|
| `gap` | `gap` |
| `g` | `column-gap` and `row-gap` |
| `gx` | `column-gap` |
| `gy` | `row-gap` |

In addition to standard properties, the `g`, `gx`, and `gy` maps also set CSS custom properties such as `--gx` or `--gy`. Layouts such as `.row` consume these variables; search for their consumers before changing their behavior.

## Letter spacing and line height

- `ls-*`: `letter-spacing` using the configured factor and unit.
- `lh-*`: `line-height`; the base configuration uses a factor of `0.25rem`.

## Suffix range

The base spacing count is 25, and the generator creates classes from zero through `count`; with the defaults, suffixes range from `0` to `25`. For a zero value, the configured unit may still be attached (for example, `0rem`).

The React theme merges settings in `themes/react/config/_responsive.scss`, changing the gap count to 20 and padding count to 10 while leaving margin at 25. The theme configuration also specifies `responsive` separately for each category. Determine the exact generated classes from the final configuration for the target theme.

## Usage example

```html
<section class="px-4 py-6">
  <div class="d-flex flex-md-column gap-3">
    <button class="mis-2">Example</button>
  </div>
</section>
```

This example demonstrates suffixes and class composition. Before using it in a real build, verify that the final configuration generates each suffix.

## Development notes

- For multilingual layouts, prefer `pis`, `pie`, `mis`, and `mie` over `pl`, `pr`, `ml`, and `mr`.
- Change the configuration map to adjust the spacing scale; do not manually edit generated classes.
- If property order matters when combining classes, inspect the output CSS and cascade behavior.
