// ============================================
// ICON SYSTEM — Size & Stroke Tokens
// Single source of truth for icon scaling.
// All icons use a 24 px canonical viewBox;
// other sizes are produced by scaling width/height
// and adjusting strokeWidth proportionally.
// ============================================

/** Named size presets */
export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSizeToken = keyof typeof ICON_SIZES;
export type IconSize = IconSizeToken | number;

/**
 * Default stroke-width per pixel size.
 * Tuned so strokes look optically consistent
 * across the four canonical sizes.
 *
 * Formula basis: base stroke = 2 at 24 px.
 *   16 → 2 × (16/24) × 1.125 ≈ 1.5
 *   20 → 2 × (20/24) × 1.05  ≈ 1.75
 *   24 → 2
 *   32 → 2 × (32/24) × 0.844 ≈ 2.25
 */
export const ICON_STROKE: Record<number, number> = {
  16: 1.5,
  20: 1.75,
  24: 2,
  32: 2.25,
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
