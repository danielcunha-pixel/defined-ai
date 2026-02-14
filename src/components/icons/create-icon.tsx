import * as React from "react";
import { cn } from "@/lib/utils";
import { resolveSize, resolveStroke, type IconSize } from "./icon-tokens";

// ============================================
// createIcon — factory for DS icon components
//
// Wraps raw SVG children (path/circle/etc.) in
// a standardised <svg> element with the DS size
// & stroke API, plus a11y behaviour.
// ============================================

export interface DSIconProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Render size. Named token or arbitrary number.
   * @default "lg" (24 px — canonical)
   */
  size?: IconSize;
  /**
   * Override default stroke-width scaling.
   * When omitted the per-size default is used.
   */
  strokeWidth?: number;
  /**
   * SVG stroke color.
   * @default "currentColor"
   */
  color?: string;
  /** Accessible label — when present the icon becomes role="img". */
  "aria-label"?: string;
  /** Accessible title — when present the icon becomes role="img". */
  title?: string;
  className?: string;
}

interface CreateIconOptions {
  /** Display name for React DevTools */
  displayName: string;
  /**
   * viewBox string. Defaults to "0 0 24 24".
   */
  viewBox?: string;
  /**
   * Default fill for the <svg> wrapper.
   * Outline icons → "none"; filled icons may use "currentColor".
   * Individual paths can still override.
   */
  defaultFill?: string;
  /**
   * Whether this is a filled (non-stroke) icon.
   * When true, stroke props are NOT applied to <svg>.
   */
  filled?: boolean;
}

/**
 * Factory that turns raw SVG children into a fully-typed DS icon.
 *
 * Usage:
 * ```tsx
 * export const IconSearch = createIcon({
 *   displayName: "IconSearch",
 * }, (props) => (
 *   <>
 *     <circle cx="11" cy="11" r="8" />
 *     <path d="m21 21-4.3-4.3" />
 *   </>
 * ));
 * ```
 */
export function createIcon(
  options: CreateIconOptions,
  renderChildren: (props: { strokeWidth: number; color: string }) => React.ReactNode
) {
  const {
    displayName,
    viewBox = "0 0 24 24",
    defaultFill = "none",
    filled = false,
  } = options;

  const Icon = React.forwardRef<SVGSVGElement, DSIconProps>(
    (
      {
        size = "lg",
        strokeWidth: strokeWidthProp,
        color = "currentColor",
        "aria-label": ariaLabel,
        title,
        className,
        children,
        ...rest
      },
      ref
    ) => {
      const px = resolveSize(size);
      const sw = resolveStroke(px, strokeWidthProp);
      const isDecorative = !ariaLabel && !title;

      const titleId = title
        ? `${displayName}-title-${React.useId()}`
        : undefined;

      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={px}
          height={px}
          fill={defaultFill}
          {...(!filled && {
            stroke: color,
            strokeWidth: sw,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          })}
          className={cn("shrink-0", className)}
          // a11y
          role={isDecorative ? undefined : "img"}
          aria-hidden={isDecorative ? true : undefined}
          aria-label={ariaLabel}
          aria-labelledby={titleId}
          {...rest}
        >
          {title && <title id={titleId}>{title}</title>}
          {renderChildren({ strokeWidth: sw, color })}
          {children}
        </svg>
      );
    }
  );

  Icon.displayName = displayName;
  return Icon;
}
