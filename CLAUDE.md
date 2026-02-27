# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No automated test runner is configured. Visual regression is validated manually via `/visual-qa/button`, `/visual-qa/top-navigation`, and `/visual-qa/footer` routes.

## Architecture

### Stack
- **Next.js 16** (App Router) + React 19 + TypeScript (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.ts`; all theme config is inline inside `globals.css`
- **shadcn/ui** (New York style) + Radix UI primitives + CVA for component variants
- **Path alias**: `@/*` → `./src/*`

### Routing
- `src/app/page.tsx` — Home
- `src/app/foundations/[slug]/page.tsx` — Renders MDX from `src/content/foundations/`
- `src/app/components/[slug]/page.tsx` — Renders MDX from `src/content/components/`
- `src/app/tokens/page.tsx` — Design token visualization
- `src/app/visual-qa/*/page.tsx` — Manual visual regression pages (isolated iframe views via `src/components/qa/`)

### Styling System

**All design tokens are CSS variables in `src/app/globals.css`** inside `@theme inline { ... }`. Tailwind utilities map directly to them:
- Colors: `bg-purple-70`, `text-grey-100`, `border-grey-20`, `bg-t-white-10`
- Spacing: `px-sp-14`, `gap-sp-24` (maps to `--spacing-sp-*`)
- Border radius: Use `rounded-[8px]` **not** `rounded-radius-8` — Tailwind v4 would look for `--radius-radius-8` (double-prefixed, does not exist)

**Button interactive states** (hover, pressed) are defined via CSS attribute selectors in `globals.css` using `[data-slot="button"][data-variant="*"]` — not in the component file itself.

**Typography — two-class system:**
```tsx
<h1 className="ds-text-display-xl font-bold text-grey-100">
<p  className="ds-text-body-md font-regular text-grey-60">
```
- **Size classes**: `ds-text-display-xl/lg`, `ds-text-heading-xl/lg/md/sm/xs`, `ds-text-body-lg/md/sm`, `ds-text-ui-button-md/sm`, `ds-text-ui-tag-md/sm`, `ds-text-ui-link-md/sm`, `ds-text-notification-md/sm`
- **Weight classes**: `font-regular` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- Legacy `typo-desktop-*` / `typo-mobile-*` aliases exist in `globals.css` but are deprecated

### Component Structure
- `src/components/ui/` — Base UI components (Button, Input, Checkbox, Dropdown, Tabs, Tooltip, Footer, TopNavigation, etc.)
- `src/components/docs/` — Documentation rendering (MDX renderer, CodeBlock, PropsTable, Sidebar, Search)
- `src/components/playground/` — Interactive component playground wrappers (`ComponentPlayground.tsx` + per-component wrappers)
- `src/components/icons/` — Custom SVG icon components (stroked and filled variants)
- `src/components/table/` — Table component
- `src/components/qa/` — Iframe + frame-size utilities for visual QA pages

### Key Files
- `src/app/globals.css` — All design tokens + typography utilities + button interaction states
- `src/lib/utils.ts` — shadcn `cn()` utility (clsx + tailwind-merge)
- `src/lib/tokens.ts` — Typography token data for the /tokens documentation page
- `components.json` — shadcn/ui config (New York style, Lucide icons, CSS variables)

## Design System Rules (from `.rules/`)

### Figma is the single source of truth
All visual values (spacing, radius, typography, colors, shadows, borders) must be extracted from Figma exactly. No approximation. Any visual drift from Figma is a bug.

### Token-first styling
Never hardcode raw values if a token exists. Prefer semantic tokens over raw value tokens. If a token is missing, keep the value local and report it as a missing token candidate.

### Variants change tokens only
Variants (colors, borders, state visuals) must never change spacing, size, radius, typography, or layout. If layout differs, create a new size or component.

### No layout shift
States (hover, focus, disabled, loading) must not resize elements. Borders must not add size (use inset techniques). Icon swaps must preserve spacing.

### DOM structure is independent of Figma structure
Do not mirror Figma frames or auto-layout containers in HTML. Prefer semantic HTML and shallow DOM trees. Use flex/grid for layout; absolute positioning only for overlays and decorative layers.

### Component API conventions
Use consistent prop names: `variant`, `size`, `disabled`, `loading`, `icon`, `asChild`. Naming: files/ids = kebab-case, components = PascalCase, props/vars = camelCase. Boolean props: `isDisabled`, `isLoading`, `hasError`, `hasIcon`.

### Button single-icon rule
A button may render **at most one icon** — either `leadingIcon` or `trailingIcon`, never both simultaneously. Validation logic lives in `src/components/ui/button.validation.ts`. In dev, invalid combinations throw errors; in production, it silently renders the first icon found (priority: `leadingIcon` > `trailingIcon` > `icon`).

### Pre-implementation checklist
Before implementing any component, produce: component tree, props interface, variant strategy, token checklist, folder structure. Verify afterward: visual parity with Figma (all states), token correctness, keyboard + focus behavior, no layout shift, edge cases (long text, icons, disabled, loading).

### Component delivery checklist
Whenever a new component is implemented, the following pages must also be created:
1. **Design System docs page** — `src/content/components/<component-name>.mdx` (usage, props, variants, examples)
2. **Visual QA page** — `src/app/visual-qa/<component-name>/page.tsx` (all states, sizes, edge cases rendered statically for visual regression)

### Figma files
- Homepage UI: `tzWPvHqc72VF3hNBmQct6Z`
- Design System Components: `2CsBqIj6tkircEZhCTg594`

## Agents
Load all agents from /.agents

##Rules
Load all rules from /.rules