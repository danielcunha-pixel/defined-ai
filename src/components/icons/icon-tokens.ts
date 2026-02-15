// ============================================
// ICON SYSTEM — Size & Stroke Tokens
// Single source of truth for icon scaling.
// All icons use a 24 px canonical viewBox;
// other sizes are produced by scaling width/height
// and adjusting strokeWidth proportionally.
// ============================================

/** Named size presets (matching Figma icon rows: 16, 20, 24) */
export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconSizeToken = keyof typeof ICON_SIZES;
export type IconSize = IconSizeToken | number;

/**
 * Default stroke-width per pixel size.
 * Values extracted from Figma source components
 * (measured via vector bounding-box overflow insets).
 *
 *   12 → 1.0   (Figma 12px icons)
 *   16 → 1.0   (Figma 16px icons)
 *   20 → 1.67  (Figma 20px icons — proportional: 2 × 20/24)
 *   24 → 2.0   (Figma 24px icons — canonical base)
 */
export const ICON_STROKE: Record<number, number> = {
  12: 1,
  16: 1,
  20: 1.67,
  24: 2,
};

/**
 * Resolve a named or numeric size to pixels.
 */
export function resolveSize(size: IconSize): number {
  return typeof size === "string" ? ICON_SIZES[size] : size;
}

/**
 * Resolve stroke-width for a given pixel size.
 * Uses the lookup table when available; otherwise
 * interpolates linearly from the 24 px base.
 */
export function resolveStroke(
  sizePx: number,
  override?: number
): number {
  if (override !== undefined) return override;
  if (sizePx in ICON_STROKE) return ICON_STROKE[sizePx];
  // linear scale from canonical 24 px / stroke 2
  return Math.round((2 * (sizePx / 24)) * 100) / 100;
}
