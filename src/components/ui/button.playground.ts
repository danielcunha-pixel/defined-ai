import { PlaygroundConfig } from '@/components/playground/types';

/**
 * Button Component Playground Configuration - Figma Aligned
 *
 * This config defines the interactive playground for the Button component,
 * matching Figma's 8-dimensional control system:
 * 1. Type (variant)
 * 2. Size
 * 3. State (enabled/hover/pressed)
 * 4. Icon (boolean)
 * 5. Icon Only (boolean)
 * 6. Icon Alignment (position)
 * 7. Filled Icon (boolean)
 * 8. Inverted (boolean)
 *
 * With smart constraints to prevent invalid combinations and match Figma exactly.
 */
export const buttonPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    // Type/Variant
    variant: 'primary',
    // Size
    size: 'md',
    // State
    state: 'enabled',
    // Icon controls
    icon: false,
    iconOnly: false,
    iconAlignment: 'none',
    filledIcon: false,
    // Modifiers
    inverted: false,
    disabled: false,
  },

  controls: {
    // 1. Type/Variant (8 options)
    variant: {
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary', value: 'tertiary' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Ghost Secondary', value: 'ghost-secondary' },
        { label: 'Glass', value: 'glass' },
        { label: 'Primary Footer', value: 'primary-footer' },
        { label: 'Primary Inverted', value: 'primary-inverted' },
      ],
      defaultValue: 'primary',
    },

    // 2. Size (4 options, conditional per variant)
    size: {
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      defaultValue: 'md',
    },

    // 3. State (enabled/hover/pressed) - visual state of the button
    state: {
      type: 'select',
      options: [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Hover', value: 'hover' },
        { label: 'Pressed', value: 'pressed' },
      ],
      defaultValue: 'enabled',
    },

    // 4. Icon (show/hide icon)
    icon: {
      type: 'boolean',
      defaultValue: false,
    },

    // 5. Icon Only (text hidden, icon only) - only relevant when icon=true
    iconOnly: {
      type: 'boolean',
      defaultValue: false,
    },

    // 6. Icon Alignment (left/right/center/none) - depends on icon/iconOnly
    iconAlignment: {
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'none',
    },

    // 7. Filled Icon (filled vs outline) - only for icon-only variants
    filledIcon: {
      type: 'boolean',
      defaultValue: false,
    },

    // 8. Inverted (inverted colors for light backgrounds)
    inverted: {
      type: 'boolean',
      defaultValue: false,
    },

    // Standard disabled state
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  // Preset variants showing common Figma combinations
  variants: [
    {
      name: 'Primary (Default)',
      props: { variant: 'primary', size: 'md', state: 'enabled' },
    },
    {
      name: 'Primary Small',
      props: { variant: 'primary', size: 'sm', state: 'enabled' },
    },
    {
      name: 'Primary with Icon Left',
      props: { variant: 'primary', size: 'md', icon: true, iconAlignment: 'left' },
    },
    {
      name: 'Primary Icon Only',
      props: { variant: 'primary', size: 'md', icon: true, iconOnly: true, iconAlignment: 'center' },
    },
    {
      name: 'Secondary Medium',
      props: { variant: 'secondary', size: 'md', state: 'enabled' },
    },
    {
      name: 'Ghost Large',
      props: { variant: 'ghost', size: 'lg', state: 'enabled' },
    },
    {
      name: 'Ghost Secondary',
      props: { variant: 'ghost-secondary', size: 'md', state: 'enabled' },
    },
    {
      name: 'Glass',
      props: { variant: 'glass', size: 'md', state: 'enabled' },
    },
    {
      name: 'Primary Footer',
      props: { variant: 'primary-footer', size: 'sm', state: 'enabled' },
    },
    {
      name: 'Primary Inverted',
      props: { variant: 'primary-inverted', size: 'md', inverted: true },
    },
  ],

  // Smart constraints matching Figma's design rules
  constraints: {
    // Hide controls that don't apply to current state
    hidden: {
      // Icon-related controls hidden when icon=false
      iconOnly: (props) => !props.icon,
      iconAlignment: (props) => !props.icon && !props.iconOnly,
      filledIcon: (props) => !props.iconOnly,
    },

    // Disable controls based on constraints
    disabled: {
      // Certain size combinations don't exist in Figma
      size: (props) => {
        const variant = String(props.variant);
        // Primary Footer: only Small size available
        if (variant === 'primary-footer') {
          return props.size !== 'sm';
        }
        // Ghost Secondary: only Medium and Large available
        if (variant === 'ghost-secondary') {
          return !['md', 'lg'].includes(String(props.size));
        }
        return false;
      },
    },

    // Filter options for selects based on current props
    filterOptions: {
      // Size options vary by variant
      size: (options, props) => {
        const variant = String(props.variant);
        // Primary Footer: only Small
        if (variant === 'primary-footer') {
          return options.filter((opt) => opt.value === 'sm');
        }
        // Ghost Secondary: only Medium/Large
        if (variant === 'ghost-secondary') {
          return options.filter((opt) => ['md', 'lg'].includes(opt.value));
        }
        // All sizes available for others
        return options;
      },

      // Icon Alignment options depend on icon/iconOnly state
      iconAlignment: (options, props) => {
        const iconOnly = Boolean(props.iconOnly);
        const hasIcon = Boolean(props.icon);

        if (!hasIcon) {
          // No icon: only 'none' option
          return options.filter((opt) => opt.value === 'none');
        }

        if (iconOnly) {
          // Icon only: only 'center' option
          return options.filter((opt) => opt.value === 'center');
        }

        // Icon with text: left/right/none options
        return options.filter((opt) => ['left', 'right', 'none'].includes(opt.value));
      },
    },

    // Normalize props to prevent invalid states
    onPropsChange: (props) => {
      const updated = { ...props };
      const variant = String(props.variant);

      // If icon is disabled, reset icon-related controls
      if (!props.icon) {
        if (props.iconOnly !== false) {
          updated.iconOnly = false;
        }
        if (props.filledIcon !== false) {
          updated.filledIcon = false;
        }
        if (props.iconAlignment !== 'none') {
          updated.iconAlignment = 'none';
        }
      }

      // If iconOnly is true but icon is false, reset
      if (props.iconOnly && !props.icon) {
        updated.iconOnly = false;
      }

      // If iconOnly is true, force iconAlignment to 'center'
      if (props.iconOnly && props.iconAlignment !== 'center') {
        updated.iconAlignment = 'center';
      }

      // Primary Footer: enforce size='sm'
      if (variant === 'primary-footer' && props.size !== 'sm') {
        updated.size = 'sm';
      }

      // Ghost Secondary: only md/lg allowed
      if (variant === 'ghost-secondary' && !['md', 'lg'].includes(String(props.size))) {
        updated.size = 'md';
      }

      return updated;
    },
  },
};
