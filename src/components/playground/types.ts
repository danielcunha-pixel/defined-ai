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

export type PlaygroundConfig = {
  defaultProps: Record<string, unknown>;
  controls: PlaygroundSchema;
  variants: PlaygroundVariant[];
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
