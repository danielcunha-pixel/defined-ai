import { PlaygroundConfig } from '@/components/playground/types';

/**
 * Checkbox Component Playground Configuration
 *
 * Control panel for interactive Checkbox exploration:
 * - checked: current checked state
 * - indeterminate: indeterminate state (mutually exclusive with checked)
 * - disabled: whether checkbox is disabled
 * - label: accompanying text label
 */
export const checkboxPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Accept terms',
  },

  controls: {
    // Checked state
    checked: {
      type: 'boolean',
      defaultValue: false,
    },

    // Indeterminate state (partially selected)
    indeterminate: {
      type: 'boolean',
      defaultValue: false,
    },

    // Disabled state
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },

    // Label text
    label: {
      type: 'text',
      defaultValue: 'Accept terms',
    },
  },

  // No presets - users control props directly
  variants: [],

  // Constraints: indeterminate and checked are mutually exclusive
  constraints: {
    onPropsChange: (props) => {
      const updated = { ...props };

      // If indeterminate is true, force checked to false
      if (props.indeterminate && props.checked) {
        updated.checked = false;
      }

      return updated;
    },
  },
};
