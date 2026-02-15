# Front-End Implementation Rules — Design System

These rules define mandatory engineering standards for all front-end code in the Design System.

They apply to all components, tokens consumption, and UI primitives.

---

## 1. Visual Fidelity Is Mandatory

- The rendered UI must match Figma exactly (pixel-perfect within reasonable tolerance).
- Any visual drift is a bug.
- All visual values must come from Figma specs and corresponding tokens.

---

## 2. Token-First Styling (No Magic Numbers)

All visual properties must use Design System tokens whenever available:

- spacing  
- radius  
- typography  
- colors  
- shadows  
- borders  
- opacity  

Hardcoded values are forbidden if a token exists.

If a token is missing:
- keep the value local temporarily
- report it as a missing token candidate (with usage count)

Prefer semantic tokens over raw value tokens.

---

## 3. Do Not Mirror Figma Structure

Figma defines visual output — not DOM structure.

- Never replicate Figma frames, groups, or auto-layout containers
- Reduce wrapper depth whenever possible
- Use layout primitives (flex/grid) properly
- Structure components as clean, semantic UI

---

## 4. Semantic HTML Is Required

Use the correct elements:

- `<button>` for actions  
- `<a>` for navigation  
- `<nav>` for navigation blocks  
- `<input>`, `<textarea>`, `<select>` for form controls  
- `<ul>/<li>` for lists when applicable  

Avoid generic `<div>` when a semantic element fits.

---

## 5. Accessibility Is Non-Negotiable

All components must:

- Be fully keyboard accessible  
- Have visible focus states  
- Use ARIA only when semantics are insufficient  
- Respect roles and relationships for overlays (tooltip, dialog, menu, popover)

Clickable areas must meet minimum hit target sizes (if defined by DS).

---

## 6. Layout Best Practices

- Prefer flexbox or CSS grid for layout
- Avoid absolute positioning for primary layout
- Use absolute positioning only for:
  - overlays (tooltip/popover)
  - decorative layers
  - tightly controlled badges/icons when needed
- Avoid fixed heights unless explicitly specified in Figma

---

## 7. Variant & Size Discipline

Variants may only change tokenized surface properties:

- colors  
- borders  
- state visuals  

Variants must never change:

- spacing  
- layout  
- typography  
- radius  
- anatomy  

If layout differs, create a new size or component.

---

## 8. Prevent Layout Shift

- States must not resize components
- Borders must not add size (use inset techniques if needed)
- Loading states must preserve dimensions
- Icon swaps must preserve spacing

---

## 9. Component API Standards

Public component APIs should follow consistent patterns:

- `variant`
- `size`
- `disabled`
- `loading`
- `icon`
- `asChild` (when composition is needed)

Avoid bloated prop surfaces.

Prefer composition over deep conditional logic.

---

## 10. Maintainability & Performance

- Keep DOM trees shallow
- Avoid unnecessary wrappers
- Avoid inline styles when tokens/classes exist
- Prefer reusable primitives
- Avoid heavy CSS effects that trigger layout reflow

---

## 11. Required Validation Output

For every component change, explicitly verify:

- Visual parity with Figma (all states)
- Token usage correctness
- Keyboard + focus behavior
- No layout shift
- Edge case handling (long text, icons, disabled, loading)

If any fail → the change is incomplete.

---

## 12. Primary Rule

If it is visually wrong, structurally messy, inaccessible, or non-tokenized — it is a bug.

Fix it before shipping.
