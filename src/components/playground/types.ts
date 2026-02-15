/**
 * Playground Schema Types
 *
 * Defines the structure for component playground configurations.
 * Each component has a config that defines:
 * - Default props
 * - Interactive controls (boolean, select, number, text)
 * - Preset variants
 */

export type PlaygroundControlType = 'boolean' | 'select' | 'number' | 'text';

export type PlaygroundControl =
  | {
      type: 'boolean';
      defaultValue: boolean;
    }
  | {
      type: 'select';
      options: Array<{ label: string; value: string }>;
      defaultValue: string;
    }
  | {
      type: 'number';
      min?: number;
      max?: number;
      defaultValue: number;
    }
  | {
      type: 'text';
      defaultValue: string;
    };

export type PlaygroundSchema = Record<string, PlaygroundControl>;

export type PlaygroundVariant = {
  name: string;
  props: Record<string, unknown>;
};

/**
 * Constraints for conditional control visibility and options
 */
export type PlaygroundConstraints = {
  /**
   * Hide controls based on current prop values
   * Example: hide iconAlignment when icon=false
   */
  hidden?: Record<string, (props: Record<string, unknown>) => boolean>;

  /**
   * Disable controls based on current prop values
   * Example: disable certain size options based on variant
   */
  disabled?: Record<string, (props: Record<string, unknown>) => boolean>;

  /**
   * Filter select options based on current prop values
   * Example: show only M/L sizes for ghost-secondary variant
   */
  filterOptions?: Record<
    string,
    (
      options: Array<{ label: string; value: string }>,
      props: Record<string, unknown>
    ) => Array<{ label: string; value: string }>
  >;

  /**
   * Normalize props after changes to prevent invalid states
   * Example: if icon=false, reset iconOnly=false
   * Return updated props or original if no changes needed
   */
  onPropsChange?: (props: Record<string, unknown>) => Record<string, unknown>;
};

export type PlaygroundConfig = {
  defaultProps: Record<string, unknown>;
  controls: PlaygroundSchema;
  variants: PlaygroundVariant[];
  constraints?: PlaygroundConstraints;
};

/**
 * Extracts the label for a control from its schema
 */
export function getControlLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
