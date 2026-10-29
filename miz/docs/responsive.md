# Responsive Behavior and Breakpoints

## Naming

Responsive classes generally follow this pattern:

```text
<prefix>-<breakpoint>-<value>
```

Examples matching the generator's naming pattern:

```html
<div class="p-sm-2 d-md-none flex-lg-column"></div>
```

These examples show the naming pattern; whether a class is available depends on its configuration and generator.

## Media query behavior

`sass/kernel/responsive/boots/_responsive.scss` uses `max-width`, not `min-width`:

- `xl` corresponds to `max-width: 1280px`.
- `md` corresponds to `max-width: 767px`.
- `sm` corresponds to `max-width: 478px`.

Therefore, do not interpret `p-md-4` as “from md and up”; its rule is generated for viewport widths up to the corresponding breakpoint.

## Base classes and `xxl`

The largest breakpoint, `xxl` at `1920px`, is emitted without a separate media query. The generator also removes the `-xxl` suffix to produce a base rule. As a result, for categories using this generator, a base value is present and variants such as `p-4` and `p-xxl-4` may refer to the same value.

This behavior depends on the generator and class category; verify any alias in the compiled CSS.

## Rule order and overlap

Breakpoints are iterated in map order: `xxl`, `xl`, `lg`, `md`, `sm`. Rules for smaller breakpoints are emitted later, and their media queries overlap. When conflicting classes are applied to one element, determine the result from the final CSS and declaration order; do not infer it from the order of classes in the HTML.

## Enabling responsive variants

In configuration maps, `responsive: true` generates breakpoint-qualified names. With `responsive: false`, the generator creates classes without a breakpoint. Display and flex behavior may use specialized generators; see `layouts/_displays.scss` and `layouts/_flex.scss`.

## Sass breakpoint lookup

`get-break-point-value($break-point)` in `sass/global-functions/_break-point.scss` returns a breakpoint value:

```scss
@use "miz/sass/global-functions/break-point" as breakpoint;

$tablet-width: breakpoint.get-break-point-value(md);
```

The import path above is illustrative and must be adapted to the project's build paths. Check the actual function declaration when using a different namespace or API.

## Changing breakpoints

Before adding, removing, or changing a breakpoint:

1. Inspect `$break-points`.
2. Keep the lengths of `header-space-*` and `boxed-space-*` lists aligned with the number of breakpoints.
3. Verify that both general and specialized generators use the intended map.
4. Compile Sass and check the expected classes and media queries.
5. Consider the effect on lists accessed by index if breakpoint order changes.
