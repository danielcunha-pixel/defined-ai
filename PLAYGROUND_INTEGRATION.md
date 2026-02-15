# Component Playground Integration Guide

This guide explains how to add an interactive playground to any component documentation page.

## Quick Start (5 minutes)

### Step 1: Create a Playground Config File

Create a `[component-name].playground.ts` file in the same directory as your component:

```typescript
// src/components/ui/checkbox.playground.ts
import { PlaygroundConfig } from '@/components/playground/types';

export const checkboxPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    checked: false,
    disabled: false,
  },

  controls: {
    checked: {
      type: 'boolean',
      defaultValue: false,
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  variants: [
    { name: 'Unchecked', props: { checked: false } },
    { name: 'Checked', props: { checked: true } },
    { name: 'Disabled', props: { checked: false, disabled: true } },
  ],
};
```

### Step 2: Import and Use in Component Page

In `src/app/components/[slug]/page.tsx`:

```typescript
import { ComponentPlayground } from '@/components/playground';
import { Checkbox } from '@/components/ui/checkbox';
import { checkboxPlaygroundConfig } from '@/components/ui/checkbox.playground';

// In the component rendering (after accessibility section):
{slug === 'checkbox' && (
  <div className="mt-8">
    <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 border-b border-grey-10 pb-2">
      Playground
    </h2>
    <div className="mt-6">
      <ComponentPlayground
        Component={Checkbox}
        playground={checkboxPlaygroundConfig}
        componentName="Checkbox"
      />
    </div>
  </div>
)}
```

## Control Types Reference

### Boolean Control

```typescript
controls: {
  disabled: {
    type: 'boolean',
    defaultValue: false,
  }
}
```

Renders as a checkbox input.

### Select Control

```typescript
controls: {
  variant: {
    type: 'select',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
    ],
    defaultValue: 'primary',
  }
}
```

Renders as a dropdown select.

### Number Control

```typescript
controls: {
  opacity: {
    type: 'number',
    min: 0,
    max: 100,
    defaultValue: 100,
  }
}
```

Renders as a number input with optional min/max bounds.

### Text Control

```typescript
controls: {
  label: {
    type: 'text',
    defaultValue: 'Click me',
  }
}
```

Renders as a text input.

## Variant Presets

Variants are preset prop combinations that users can select:

```typescript
variants: [
  {
    name: 'Primary Button',
    props: { variant: 'primary', size: 'md' },
  },
  {
    name: 'Ghost Disabled',
    props: { variant: 'ghost', disabled: true },
  },
]
```

When a user selects a variant:
- All props from that variant are applied
- Users can still override individual props with controls
- Control changes override the variant props

## URL Persistence

The playground automatically generates shareable URLs:

- `/components/button?variant=secondary&size=lg&disabled=true`
- Users can copy the "Copy URL" button to share their configuration
- URLs are read from `?param=value` on page load

## Schema Type Definition

```typescript
type PlaygroundConfig = {
  defaultProps: Record<string, unknown>;
  controls: {
    [propName: string]: PlaygroundControl;
  };
  variants: Array<{
    name: string;
    props: Record<string, unknown>;
  }>;
};
```

## Examples

### Simple Boolean Component (Switch)

```typescript
export const switchPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    checked: false,
    disabled: false,
  },

  controls: {
    checked: {
      type: 'boolean',
      defaultValue: false,
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  variants: [
    { name: 'Off', props: { checked: false } },
    { name: 'On', props: { checked: true } },
    { name: 'Disabled', props: { disabled: true } },
  ],
};
```

### Multi-Variant Component (Button)

```typescript
export const buttonPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },

  controls: {
    variant: {
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
      defaultValue: 'primary',
    },
    size: {
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      defaultValue: 'md',
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  variants: [
    { name: 'Primary (Default)', props: { variant: 'primary', size: 'md' } },
    { name: 'Secondary Large', props: { variant: 'secondary', size: 'lg' } },
    { name: 'Ghost Small', props: { variant: 'ghost', size: 'sm' } },
  ],
};
```

### Component with Text Input (Input Field)

```typescript
export const inputPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    placeholder: 'Enter text...',
    disabled: false,
    error: false,
  },

  controls: {
    placeholder: {
      type: 'text',
      defaultValue: 'Enter text...',
    },
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
    error: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  variants: [
    { name: 'Default', props: { placeholder: 'Enter text...' } },
    { name: 'With Error', props: { error: true } },
    { name: 'Disabled', props: { disabled: true } },
  ],
};
```

## Best Practices

1. **Keep controls focused**: Only expose props that are relevant for interaction. Don't expose className, ref, etc.

2. **Use meaningful variant names**: Names like "Primary (Default)" or "Disabled State" are clearer than "Variant 1".

3. **Include common combinations**: Variants should show the most useful prop combinations (e.g., "Large Disabled Button").

4. **Default to a sensible state**: Set `defaultProps` to a common, non-extreme state.

5. **Label controls clearly**: Control names are automatically converted to title case (e.g., `isDisabled` → "Is Disabled"), but keep prop names simple.

## Component Playground Features

The `<ComponentPlayground />` automatically provides:

- ✅ Variant selector dropdown
- ✅ Dynamic controls panel (generated from schema)
- ✅ Live preview area with gradient background
- ✅ Current props display in JSON format
- ✅ Copy Props JSON button
- ✅ Copy URL button (for sharing configurations)
- ✅ URL persistence (?variant=primary&size=md)
- ✅ Control type validation (boolean, select, number, text)

## Testing Your Playground

1. Navigate to the component page (e.g., `/components/button`)
2. Scroll to the "Playground" section
3. Test each variant - preview should update
4. Test each control - props should merge correctly
5. Copy Props JSON - should be valid JSON
6. Copy URL - URL should include current state
7. Reload page with generated URL - should restore state

## Troubleshooting

### Playground not showing up
- Verify the import is correct in page.tsx
- Check that the slug condition matches your component name
- Verify `Component` prop is the actual React component

### Controls not updating preview
- Ensure control names in `controls` match prop names
- Verify component accepts those props
- Check browser console for TypeScript errors

### URL params not being read
- URL params are case-sensitive
- Use the exact prop name (e.g., `?variant=primary`, not `?Variant=primary`)
- Test with the generated URL from "Copy URL" button

## Files Reference

- **ComponentPlayground.tsx**: Main playground container component
- **PlaygroundControl.tsx**: Individual control renderer
- **types.ts**: TypeScript definitions for playground schema
- **[component].playground.ts**: Per-component configuration (create one for each component)
