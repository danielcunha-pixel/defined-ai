import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Chip — Design System component.
 * Pill-shaped clickable label.
 * Tooltip on hover is NOT part of this component (per spec).
 */

type ChipVariant = "red" | "purple" | "green" | "blue" | "orange" | "grey" | "white" | "outline";
type ChipVisualState = "enabled" | "hover" | "pressed" | "focus";
type ChipStateProp = ChipVisualState | "default";

const chipBaseClass = [
  "relative inline-flex box-border items-center justify-center whitespace-nowrap cursor-pointer",
  "rounded-[var(--radius-8)] px-sp-8 py-sp-6",
  "ds-text-ui-tag font-medium leading-normal",
  "outline-none transition-[background-color,border-color,color,opacity]",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
].join(" ");

const chipStateClasses: Record<Exclude<ChipVariant, "outline">, Record<ChipVisualState, string>> = {
  red: {
    enabled: "bg-red-10 text-red-100 border-0",
    hover: "bg-red-20 text-red-100 border-0 cursor-pointer",
    pressed: "bg-red-30 text-red-100 border-0",
    focus: "bg-red-10 text-red-100 border-2 border-purple-70",
  },
  purple: {
    enabled: "bg-purple-10 text-purple-100 border-0",
    hover: "bg-purple-20 text-purple-100 border-0 cursor-pointer",
    pressed: "bg-purple-30 text-purple-100 border-0",
    focus: "bg-purple-10 text-purple-100 border-2 border-purple-70",
  },
  green: {
    enabled: "bg-green-10 text-green-100 border-0",
    hover: "bg-green-20 text-green-100 border-0 cursor-pointer",
    pressed: "bg-green-30 text-green-100 border-0",
    focus: "bg-green-10 text-green-100 border-2 border-purple-70",
  },
  blue: {
    enabled: "bg-blue-10 text-blue-100 border-0",
    hover: "bg-blue-20 text-blue-100 border-0 cursor-pointer",
    pressed: "bg-blue-30 text-blue-100 border-0",
    focus: "bg-blue-10 text-blue-100 border-2 border-purple-70",
  },
  orange: {
    enabled: "bg-orange-10 text-orange-100 border-0",
    hover: "bg-orange-20 text-orange-100 border-0 cursor-pointer",
    pressed: "bg-orange-30 text-orange-100 border-0",
    focus: "bg-orange-10 text-orange-100 border-2 border-purple-70",
  },
  grey: {
    enabled: "bg-grey-20 text-grey-100 border-0",
    hover: "bg-grey-30 text-grey-100 border-0 cursor-pointer",
    pressed: "bg-grey-40 text-grey-100 border-0",
    focus: "bg-grey-20 text-grey-100 border-2 border-purple-70",
  },
  white: {
    enabled: "bg-white text-grey-100 border border-grey-20",
    hover: "bg-grey-10 text-grey-100 border border-grey-20 cursor-pointer",
    pressed: "bg-grey-20 text-grey-100 border border-grey-30",
    focus: "bg-white text-grey-100 border-2 border-purple-70",
  },
};

const chipInteractiveClasses: Record<Exclude<ChipVariant, "outline">, string> = {
  red: "hover:bg-red-20 active:bg-red-30 focus-visible:border-2 focus-visible:border-purple-70",
  purple: "hover:bg-purple-20 active:bg-purple-30 focus-visible:border-2 focus-visible:border-purple-70",
  green: "hover:bg-green-20 active:bg-green-30 focus-visible:border-2 focus-visible:border-purple-70",
  blue: "hover:bg-blue-20 active:bg-blue-30 focus-visible:border-2 focus-visible:border-purple-70",
  orange: "hover:bg-orange-20 active:bg-orange-30 focus-visible:border-2 focus-visible:border-purple-70",
  grey: "hover:bg-grey-30 active:bg-grey-40 focus-visible:border-2 focus-visible:border-purple-70",
  white: "hover:bg-grey-10 active:bg-grey-20 active:border-grey-30 focus-visible:border-2 focus-visible:border-purple-70",
};

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Color variant from Figma component set. */
  variant?: ChipVariant;
  /** Static visual state from Figma component set. */
  state?: ChipStateProp;
  /** Backward-compatible alias of focus state */
  selected?: boolean;
}

function Chip({
  className,
  variant = "grey",
  state,
  selected = false,
  disabled,
  children,
  ...props
}: ChipProps) {
  const normalizedVariant = variant === "outline" ? "white" : variant;
  const hasExplicitState = state !== undefined || selected;
  const normalizedState = state === "default" ? "enabled" : state;
  const visualState: ChipVisualState = normalizedState ?? (selected ? "focus" : "enabled");
  const stateClass = chipStateClasses[normalizedVariant][visualState];
  const interactiveClass = hasExplicitState ? "" : chipInteractiveClasses[normalizedVariant];

  const baseProps = {
    "data-slot": "chip",
    "data-variant": normalizedVariant,
    "data-state": visualState,
    className: cn(
      chipBaseClass,
      stateClass,
      interactiveClass,
      disabled && "pointer-events-none opacity-50",
      className
    ),
    ...props,
  };

  const content = (
    <span className="inline-flex min-w-0 items-center justify-center pb-sp-1">
      {children}
    </span>
  );

  return (
    <button
      type="button"
      disabled={disabled}
      {...baseProps}
    >
      {content}
    </button>
  );
}

export { Chip };
