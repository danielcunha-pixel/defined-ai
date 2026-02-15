# Button Single-Icon Rule

## Rule Statement

A Button component must render **at most ONE icon element** at any time.

A Button may display:
- No icon (label-only)
- One left icon (with label)
- One right icon (with label)
- One icon in icon-only variant (no label)

A Button must **NEVER** render:
- Two icons simultaneously (left + right together)
- More than one icon element in the DOM

---

## Rationale

### Visual Clarity
Multiple icons in a single button create visual ambiguity and confusion about which icon represents the button's action. Users cannot determine button intent with competing visual signals.

### Consistency with Design System
Figma Button component variants explicitly support single-icon patterns only. Multi-icon layouts are not defined in the design system and indicate a misuse of the component.

### Accessibility
Screen reader users benefit from single, clear icon associations. Multiple icons without proper ARIA labeling create confusing announcements and unclear button purpose.

### DOM Simplicity
Keeping button DOM minimal reduces complexity, improves maintenance, and ensures consistent styling and state management.

---

## Enforcement Behavior

### Compile-Time Validation
Props validation **must** prevent invalid combinations before rendering.

**Valid prop combinations:**
- `icon={undefined}` (no icon)
- `icon={<Icon />}` (single icon, no placement specified = default)
- `leadingIcon={<Icon />}, trailingIcon={undefined}` (left icon only)
- `leadingIcon={undefined}, trailingIcon={<Icon />}` (right icon only)
- `iconOnly={true}, icon={<Icon />}` (icon-only variant with single icon)

**Invalid prop combinations:**
- `leadingIcon={<Icon1 />}, trailingIcon={<Icon2 />}` (both left AND right)
- `iconOnly={true}, leadingIcon={<Icon />}, trailingIcon={<Icon />}` (icon-only with multiple icons)
- `icon={<Icon />}, leadingIcon={<Icon />}` (generic + specific placement both provided)

### Runtime Guards (Development Mode Only)
When **development mode** is enabled:

1. **Check prop validity** before rendering Button
2. **Log error message** to console with:
   - Which props conflict
   - Which combination was attempted
   - Which combinations are valid
   - Link to Button documentation (if available)
3. **Throw error** (optional, for stricter environments) or **render nothing** with console warning

**Error message format:**

```
❌ [Button] Invalid icon configuration detected.
   Attempted: leadingIcon + trailingIcon both provided
   Valid options:
   - No icon: (omit icon props)
   - Single left icon: leadingIcon only
   - Single right icon: trailingIcon only
   - Icon-only: iconOnly={true} with single icon

   Fix: Remove either leadingIcon or trailingIcon.
   See: <component-docs-url>
```

### Production Mode Behavior
In production, silent fallback is acceptable:
- Render the first icon prop found (priority: leadingIcon > trailingIcon > icon)
- Log warning to analytics (do not break user experience)

---

## Implementation Details

### Button Component Level
In `src/components/ui/button.tsx` or layout wrapper:

```typescript
// Props type guard
function validateIconConfig(props: ButtonProps): boolean {
  const iconCount = [props.leadingIcon, props.trailingIcon, props.icon].filter(Boolean).length;

  if (iconCount > 1) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        '[Button] Multiple icons detected. Render one icon only. ' +
        'Valid: no icon, leadingIcon only, trailingIcon only, or icon-only variant.'
      );
    }
    return false;
  }

  return true;
}

function Button(props: ButtonProps) {
  if (!validateIconConfig(props)) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('[Button] Invalid icon config');
    }
    // Production: silently render first icon (fallback)
  }

  // Render Button with single icon
}
```

### Playground Level
In component playground (e.g., `src/components/playground/ComponentPlayground.tsx`):

```typescript
// Constraints: prevent invalid combinations
constraints: {
  onPropsChange: (props) => {
    // If iconOnly is true, remove any other icon props
    if (props.iconOnly && (props.leadingIcon || props.trailingIcon)) {
      return { ...props, leadingIcon: false, trailingIcon: false };
    }

    // If both left and right icons are true, keep only the most recent
    // (or show validation error in UI)
    if (props.leadingIcon && props.trailingIcon) {
      console.warn('[Playground] Cannot render both left and right icons');
      return { ...props, trailingIcon: false };
    }

    return props;
  },
}
```

---

## Examples

### ✅ Valid Usage

**Single left icon with label:**
```tsx
<Button variant="primary" size="md" leadingIcon={<IconPlus />}>
  Create New
</Button>
```

**Single right icon with label:**
```tsx
<Button variant="primary" size="md" trailingIcon={<IconChevronRight />}>
  Next Step
</Button>
```

**Icon-only button (no label):**
```tsx
<Button variant="primary" size="icon-md" icon={<IconPlus />} iconOnly />
```

**No icon, label only:**
```tsx
<Button variant="primary" size="md">
  Save Changes
</Button>
```

---

### ❌ Invalid Usage

**Both left and right icons (not allowed):**
```tsx
// INVALID - do not render
<Button leadingIcon={<IconArrowLeft />} trailingIcon={<IconArrowRight />}>
  Navigate
</Button>
```

**Icon-only with label (contradictory):**
```tsx
// INVALID - iconOnly implies no label, so remove one
<Button iconOnly leadingIcon={<IconPlus />}>
  Create
</Button>
```

**Multiple icon props (ambiguous):**
```tsx
// INVALID - choose one method
<Button icon={<IconX />} leadingIcon={<IconY />}>
  Action
</Button>
```

---

## Testing & Validation

### Unit Test Checklist
- [ ] Button with no icon renders correctly
- [ ] Button with leadingIcon only renders correctly
- [ ] Button with trailingIcon only renders correctly
- [ ] Button with iconOnly=true renders correctly
- [ ] Both leadingIcon and trailingIcon together throws error (dev) or renders first only (prod)
- [ ] Invalid prop combinations log appropriate errors in development mode

### Visual Regression Checks
- [ ] Single-icon buttons match Figma specs exactly
- [ ] Icon sizing and alignment match Figma
- [ ] Icon-only buttons are perfect squares per size

### Accessibility Checks
- [ ] Screen reader announces button with icon correctly
- [ ] Icon has proper semantic association with button text
- [ ] Focus states are visible on all icon variants

---

## Related Rules

- **UI Fidelity Rules** (`.rules/ui-fidelity`) — Figma is source of truth
- **Naming Conventions** (`.rules/naming-conventions.md`) — Use canonical prop names consistently
- **Accessibility Guidelines** (`.rules/accessibility-guidelines.md`) — Icon ARIA labeling

---

## References

- Button component: `src/components/ui/button.tsx`
- Button playground: `src/components/playground/button.playground.ts`
- Button state classes: `src/components/playground/buttonStateClasses.ts`
- Figma Design System: https://figma.com/design/2CsBqIj6tkircEZhCTg594 (Button component)
