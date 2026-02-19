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
    responsive: false,
    state: 'enabled',
    iconPlacement: 'none',
    iconOnly: false,
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

    responsive: {
      type: 'boolean',
      defaultValue: false,
    },

    // State: Visual state simulation (not a real prop)
    // Includes "Disabled" as a visual state option
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
    // Playground handles rendering the icon based on this value
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
  },

  // No presets - users control props directly
  variants: [],

  // Constraints: size limitations + single-icon enforcement
  constraints: {
    // Disable Icon control when size=xl
    disabled: {
      iconPlacement: (props) => props.size === 'xl',
    },

    // Auto-correct props to enforce rules:
    // 1. Size=xl cannot have icons
    // 2. Single icon only (iconOnly=true removes other icons)
    // 3. iconOnly cannot be true if iconPlacement has an icon
    onPropsChange: (props) => {
      const updated = { ...props };

      // Rule 1: XL size cannot have icons
      if (props.size === 'xl' && props.iconPlacement !== 'none') {
        updated.iconPlacement = 'none';
      }

      // Rule 2: If iconOnly is true, ensure no icon placement
      // (iconOnly means show only the icon, hide text)
      if (props.iconOnly && props.iconPlacement !== 'none') {
        // Auto-correct: keep iconOnly but remove icon placement
        // The playground will render the icon from iconOnly state
        updated.iconPlacement = 'none';
      }

      return updated;
    },
  },
};
