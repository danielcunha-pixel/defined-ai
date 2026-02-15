/**
 * Button Icon Configuration Validation
 *
 * Enforces the single-icon rule: A button must render at most ONE icon at any time.
 * Reference: .rules/button-single-icon.md
 */

export interface IconConfig {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

/**
 * Validate that button has at most one icon
 *
 * Valid combinations:
 * - No icons (all undefined)
 * - leadingIcon only
 * - trailingIcon only
 * - icon only
 * - iconOnly with single icon
 *
 * Invalid combinations:
 * - leadingIcon + trailingIcon (both provided)
 * - leadingIcon + icon (both provided)
 * - trailingIcon + icon (both provided)
 * - Any icon with conflicting iconOnly
 */
export function validateIconConfig(config: IconConfig): ValidationResult {
  const { leadingIcon, trailingIcon, icon, iconOnly } = config;

  // Count how many icon props are provided
  const iconCount = [leadingIcon, trailingIcon, icon].filter(Boolean).length;

  // Valid: 0 or 1 icons
  if (iconCount <= 1) {
    return { isValid: true };
  }

  // Invalid: Multiple icon props provided
  const providedIcons = [];
  if (leadingIcon) providedIcons.push('leadingIcon');
  if (trailingIcon) providedIcons.push('trailingIcon');
  if (icon) providedIcons.push('icon');

  const error = `[Button] Multiple icons detected: ${providedIcons.join(', ')}. A button can only render one icon.`;

  const suggestion = `Remove all but one of: ${providedIcons.join(', ')}. Valid: leadingIcon only, trailingIcon only, or icon only.`;

  return {
    isValid: false,
    error,
    suggestion,
  };
}

/**
 * Log validation error with detailed message (development only)
 */
export function logIconValidationError(
  config: IconConfig,
  validation: ValidationResult
): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (validation.isValid) {
    return;
  }

  console.error(validation.error);
  if (validation.suggestion) {
    console.log(`💡 ${validation.suggestion}`);
  }
  console.log('📖 See: .rules/button-single-icon.md');
}

/**
 * Get the first valid icon from config (fallback strategy)
 * Priority: leadingIcon > trailingIcon > icon
 */
export function getFirstValidIcon(config: IconConfig): React.ReactNode {
  if (config.leadingIcon) return config.leadingIcon;
  if (config.trailingIcon) return config.trailingIcon;
  if (config.icon) return config.icon;
  return undefined;
}

/**
 * Normalize icon config to single icon (production fallback)
 * Removes conflicting props, keeping only the first provided
 */
export function normalizeIconConfig(config: IconConfig): IconConfig {
  const validation = validateIconConfig(config);

  if (validation.isValid) {
    return config;
  }

  // Production fallback: keep only first icon, remove others
  const normalized: IconConfig = { ...config };

  if (config.leadingIcon) {
    // Keep leadingIcon, remove others
    delete normalized.trailingIcon;
    delete normalized.icon;
  } else if (config.trailingIcon) {
    // Keep trailingIcon, remove others
    delete normalized.icon;
  }
  // If only icon is set, keep it as-is

  return normalized;
}
