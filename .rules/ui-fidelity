# UI Fidelity Rules — Figma to Implementation

These rules ensure that all components implemented from Figma remain pixel-perfect and fully consistent with the design system source of truth.

Figma is always the single source of truth.

Any visual drift between Figma and implementation is considered a bug.

---

## 1. Figma as Source of Truth

All visual values must be explicitly extracted from Figma.

This includes (but is not limited to):

- Border radius  
- Spacing (padding, margin, gaps)  
- Font size and line height  
- Colors  
- Shadows (blur, spread, opacity, offsets)  
- Border widths  
- Icon sizes  
- Component heights  

No value may be guessed, approximated, or eyeballed.

If a value is unclear, measure it directly in Figma.

---

## 2. Core Anatomy Before Variants

Each component must define a fixed core anatomy.

Core anatomy includes:

- Height per size (sm, md, lg, etc.)  
- Padding (horizontal and vertical)  
- Border radius  
- Typography (font, size, line height, weight)  
- Internal spacing (icon gaps, content alignment)  
- Focus ring behavior  

This anatomy must remain invariant across all variants.

---

## 3. Variants Change Tokens Only

Variants may only change token-based visual properties:

- Background color  
- Border color  
- Text color  
- State colors (hover, active, disabled)  

Variants must never change:

- Spacing  
- Size  
- Radius  
- Typography  
- Layout  

If layout changes are required, a new component or size must be created instead of a variant.

---

## 4. Zero Visual Approximation

Visual similarity is not acceptable.

Only numeric equality with Figma values is valid.

Forbidden practices:

- Approximating values  
- “Close enough” adjustments  
- Manual visual tweaking  

All values must match Figma specs exactly.

---

## 5. Complex Shapes Must Use Figma Geometry

For any non-rectangular or custom visual shape (including but not limited to):

- Tooltip arrows  
- Speech bubble tails  
- Notches  
- Custom shadows  

Use one of the following:

- SVG exported directly from Figma  
- Exact geometric values measured from Figma  

Never redraw or approximate shapes manually in code.

---

## 6. Tokens Are Mandatory

No visual property may exist without a corresponding design token.

Tokens must cover:

- Colors  
- Spacing  
- Radius  
- Typography  
- Shadows  
- Opacity  

If a token does not exist, it must be created before implementation.

Prefer semantic tokens over raw value tokens when available.

---

## 7. Diff Before Patch

Before modifying any component:

1. Extract exact Figma specs  
2. Inspect the current implementation  
3. List all numeric mismatches  
4. Patch only the mismatches  

Never redesign or refactor visually without a spec diff.

---

## 8. Edge Cases Are Part of the Component

Every component must explicitly support:

- Long text  
- Disabled state  
- Loading state (if interactive)  
- Icon + text combinations  
- Icon-only variants (when applicable)  

If layout breaks in any edge case, it is a bug.

---

## 9. Regression Validation

After any fix or update:

- Revalidate all variants  
- Revalidate all sizes  
- Recheck edge cases  

No component change is complete without regression verification.

---

## 10. Visual Fidelity Over Figma Structure

Figma defines visual output, not implementation structure.

The DOM/component structure must NOT mirror Figma frames, groups, or auto-layout containers.

The implementation may freely restructure layout to:

- reduce wrapper depth  
- use semantic HTML  
- apply flex/grid best practices  
- improve maintainability and accessibility  

As long as the rendered result matches Figma exactly.

Copying Figma structure is discouraged unless technically necessary.

---

## 11. Primary Rule

If it differs from Figma, it is a bug — not a design decision.

Figma always wins.
