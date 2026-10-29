# MIZ Documentation

This directory contains the technical guide to MIZ. It is intended to help developers and AI agents navigate the actual source, use utility classes correctly, and make Sass changes that follow the existing patterns.

## Reading path

1. [Architecture and structure](./architecture.md)
2. [Configuration](./config.md)
3. [Responsive behavior and breakpoints](./responsive.md)
4. [Spacing utilities](./space.md)
5. [Dimensions, columns, and grid](./dims.md)
6. [Utility class reference](./classes.md)
7. [Themes](./themes.md)
8. [Components](./components.md)
9. [Sass API and development guidelines](./sass-api.md)

## Overview

MIZ is a Sass-based framework. Its source includes design configuration, Sass functions, utility classes, theme output, and a component collection. Many utilities are generated from Sass maps, so their available classes and values must be determined from the relevant configuration and generator—not from a class name alone.

## Source of truth

When this guide differs from the code, the current source is authoritative. Key locations:

- Sass entrypoints: `miz/_index.scss` and `miz/sass/_index.scss`
- Base configuration: `miz/sass/config/`
- Class generators: `miz/sass/kernel/responsive/functions/`
- Responsive output generation: `miz/sass/kernel/responsive/boots/_responsive.scss`
- Theme structure: `miz/themes/`
- React theme configuration: `miz/themes/react/config/`
- Mizoon components: `miz/themes/mizoon/components/`

## Usage principles

- Before documenting a class or API, verify it in the relevant generator or Sass file.
- A MIZ breakpoint name does not necessarily mean `min-width`; see [responsive.md](./responsive.md) for the actual behavior.
- When describing a change, identify the target theme and the configuration that affects it.
- Classes generated from configurable maps can change when `count`, `factor`, `unit`, or `responsive` changes.
- If documented behavior disagrees with compiled CSS, update the documentation based on the source and output rather than guessing.
