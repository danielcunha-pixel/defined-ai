# Naming conventions (Design System)

## Prime directive
When reading any naming from Figma (via MCP or otherwise), DO NOT inherit names by default.
Always normalize names to these conventions.

## Case conventions
- Files/paths/ids: kebab-case (e.g., `icon-button`, `date-picker`)
- Components (code): PascalCase (e.g., `IconButton`, `DatePicker`)
- Props/vars: camelCase (e.g., `isDisabled`, `leadingIcon`)

## Component naming
- Base names must be generic and reusable (no page/context): ✅ `Button` ❌ `HomepageButton`
- Avoid suffix noise: `Final`, `Copy`, `v2`, `test`, emojis, trailing spaces (must be cleaned)

## Variant/property naming (canonical)
Use these property names consistently across component sets:
- `variant`: `primary | secondary | tertiary | ghost | link | destructive`
- `size`: `xs | sm | md | lg | xl`
- `state`: `default | hover | pressed | focus | disabled`
- `tone`: `neutral | info | success | warning | danger`
- `layout`: `default | iconOnly | leadingIcon | trailingIcon`
- Booleans: `isDisabled`, `isLoading`, `hasError`, `hasIcon`

## Token naming (semantic first)
Prefer semantic tokens over raw values:
- `text/*`, `bg/*`, `border/*`, `icon/*`, `focus/*`
Never introduce ad-hoc categories.

## Layer/frame naming (Figma)
- Screens: `Screen / <Feature> / <State>`
- Sections: `Section / <Name>`
- Layout containers: `Stack / <Name>` or `Grid / <Name>`
Do not encode spacing in names (avoid `Stack-16`).

## Synonyms normalization
- Type/Style/Kind → `variant`
- Status → `state` (or `tone` if semantic meaning)
- Color/Colour → token reference or `tone` (avoid raw color names)
