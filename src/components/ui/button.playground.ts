import { PlaygroundConfig } from '@/components/playground/types';

/**
 * Button Component Playground Configuration - Prop-First
 *
 * Simple, direct control panel mapping to Button props:
 * - Type: Button variant (Primary, Secondary, etc.)
 * - Size: Button size (Small, Medium, Large, XL)
 * - State: Visual state for simulation (Enabled, Hover, Focus, Pressed, Disabled)
 * - Icon: Icon placement (None, Left, Right) - maps to iconPlacement prop
 * - Icon only: Hide text, show icon only
 * - Inverted: Inverted colors for light backgrounds
 *
 * No presets. Controls directly map to props.
 */
export const buttonPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    variant: 'primary',
    size: 'md',
    state: 'enabled',
    iconPlacement: 'none',
    iconOnly: false,
    inverted: false,
    disabled: false,
  },

  controls: {
    // Type: Maps to variant prop
    variant: {
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary', value: 'tertiary' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Glass', value: 'glass' },
      ],
      defaultValue: 'primary',
    },

    // Size: Small/Medium/Large/XL
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

    // State: Visual state simulation (not a real prop)
    state: {
      type: 'select',
      options: [
        { label: 'Enabled', value: 'enabled' },
        { label: 'Hover', value: 'hover' },
        { label: 'Focus', value: 'focus' },
        { label: 'Pressed', value: 'pressed' },
        { label: 'Disabled', value: 'disabled' },
      ],
      defaultValue: 'enabled',
    },

    // Icon: Single control for icon placement
    // Maps to iconPlacement prop: 'none' | 'left' | 'right'
    iconPlacement: {
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'none',
    },

    // Icon only: Hide text, show icon only
    iconOnly: {
      type: 'boolean',
      defaultValue: false,
    },

    // Inverted: For use on dark/colored backgrounds
    inverted: {
      type: 'boolean',
      defaultValue: false,
    },

    // Disabled: Standard disabled state
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  // No presets - users control props directly
  variants: [],

  // Simple constraints for XL size (no icons)
  constraints: {
    // Disable Icon control when size=xl
    disabled: {
      iconPlacement: (props) => props.size === 'xl',
    },

    // Auto-reset icon to 'none' when size becomes xl
    onPropsChange: (props) => {
      const updated = { ...props };
      if (props.size === 'xl' && props.iconPlacement !== 'none') {
        updated.iconPlacement = 'none';
      }
      return updated;
    },
  },
};
