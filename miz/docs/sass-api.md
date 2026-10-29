# Sass API and Development Guidelines

## Modules and imports

The project uses the Sass module system: `@use` and `@forward`. A common module-loading pattern is:

```scss
@use "sass:map";
@use "path/to/config" as *;
```

In new code, follow nearby files for module names and namespaces. Use `as *` only when consistent with local conventions and after considering possible name collisions.

## Useful functions

### `get-break-point-value($break-point)`

Defined in `sass/global-functions/_break-point.scss` and `sass/kernel/kernel-functions/_break-point.scss`; returns a breakpoint value from `$break-points`.

### Responsive generator functions

In `sass/kernel/responsive/functions/_responsive.scss`:

- `generate-classes(...)`: creates numeric or percentage suffixes
- `generate-classes-responsive-on-value(...)`: creates a breakpoint-qualified name
- `generate-classes-on-value(...)`: creates a name without a breakpoint
- `generate-classes-items(...)`: generates class/property/value maps from configuration
- `check-status(...)`: reads a key's status from a configuration map
- `generate-typography-size-classes(...)`: creates font-size maps from typography settings

These functions are part of the generator's internal implementation. Before using them directly in a theme, inspect their signatures and module-loading requirements in the source.

### Spacing functions

In `sass/kernel/responsive/functions/_space.scss`:

- `generate-class-name-list-space(...)`
- `generate-key(...)`
- `generate-value-space(...)`
- `generate-total-map-list(...)`

These functions map class prefixes to CSS properties and convert suffixes into values based on the configured factor and unit.

## Adding a utility class

For a new utility:

1. Decide which layer owns the utility: common, responsive layout, boot, or theme.
2. If its values are configurable, use an existing Sass map or add one following local conventions.
3. If it is responsive, use `generate-classes-items` or the appropriate generator pattern.
4. If the boot collects output from multiple lists, add the new category to `$total-list`.
5. Ensure the correct barrel forwards the new file.
6. Compile Sass and inspect base and breakpoint-qualified selectors.

## Theme public APIs

`themes/react/components/readme.md` recommends named exports and PascalCase function names for React components. Verify JavaScript/React APIs against actual exports and existing components; do not confuse Sass naming conventions with JavaScript export conventions.

## Paths and naming conventions

- React component directories: `kebab-case`
- Function names in the React guide: `PascalCase`
- Utility classes: generally use a short or property-based prefix followed by a value suffix
- Sass partials: filenames begin with an underscore, such as `_responsive.scss`

## Common mistakes

- Assuming breakpoints use `min-width`; MIZ uses `max-width`.
- Assuming a class suffix equals its CSS value; spacing and percentages are transformed.
- Changing `count` without checking suffix ranges or dependent arrays.
- Adding Sass to a file without forwarding it from the relevant barrel or entrypoint.
- Assuming a component or theme is accessible because it exists in the source.
- Using a theme Sass variable without checking which module the generator actually consumes.

## Validation

Documentation-only changes do not require a build. For Sass or theme changes:

1. Find the actual build/lint command in the project manifest or CI; do not guess a command.
2. Compile Sass using the target entrypoint and theme.
3. Inspect the generated selectors and media queries for important examples.
4. If rendered CSS or a component changes, verify the relevant states and sizes as well.
