# Components

## Component types

### Mizoon

Mizoon components live in `themes/mizoon/components/`. Each component typically has its own directory and may contain:

- `_index.scss`: component styles
- `script.js`: interactive behavior
- example directories such as `basic/`, `solid/`, or `disabled/` containing `index.html`

Before developing a component, use the closest existing example as a reference; not all components have exactly the same files.

### React

React-related Sass components live in `themes/react/components/`. The current barrel forwards button, card, table, and data-table. The `readme.md` in that directory documents these conventions:

- Directory names: `kebab-case`
- Function names: `PascalCase`
- Export functions as named exports, not default exports
- Turn repeated behavior into functions
- Keep behavior dynamic where it can be dynamic
- Make details controllable

Apply these rules to React components, but verify component signatures and JSX patterns against peers in the same theme.

## Component CSS conventions

The `button/_index.scss` and `card/_index.scss` examples show that components:

- Use component-specific selectors such as `.btn` or `.card`.
- Reuse kernel utilities with `@extend`.
- Use CSS custom properties and palette tokens.
- Handle states such as focus, disabled, hover, and ARIA when appropriate.
- May respond to attributes such as `data-size`, `data-slot`, or ARIA state.

These examples are references; do not invent a new component state or API based only on this document.

## Development workflow

1. Break the request into behavior, states, sizes, breakpoints, and edge cases.
2. Find a similar component in the same theme and inspect its barrels and configuration.
3. Express the styling behavior in plain CSS first, then convert it to SCSS.
4. Create the component in the correct theme path and scope its selectors.
5. Update the theme barrel if required.
6. For interactive components, follow the behavior of examples in the same theme.
7. Compile Sass and verify states, accessibility, and responsive behavior.

## Accessibility and states

- Do not remove visible focus; `:focus-visible` in the React button is one example.
- Style disabled, `aria-expanded`, and `aria-invalid` according to the component's actual semantics.
- SVG icons should not unintentionally affect pointer interaction or component dimensions.
- For RTL/LTR layouts, prefer `margin-inline-*`, `padding-inline-*`, and logical properties where possible.

## Reference examples

- React button: `themes/react/components/button/_index.scss`
- React card: `themes/react/components/card/_index.scss`
- React component conventions: `themes/react/components/readme.md`
- Mizoon component styles and demos: `themes/mizoon/components/`

The paths above are relative to the `miz/` directory.
