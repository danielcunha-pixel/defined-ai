"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type DSLinkSize = "small" | "medium" | "large";
export type DSLinkStyle = "white" | "purple" | "grey" | "dark-grey" | "medium-grey" | "pink";
export type DSLinkState = "enabled" | "hover" | "pressed" | "focus" | "disabled";
export type DSLinkPlatform = "responsive" | "desktop" | "mobile";

export interface DSLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color" | "style"> {
  size?: DSLinkSize;
  style?: DSLinkStyle;
  state?: DSLinkState;
  platform?: DSLinkPlatform;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

type StyleTokens = {
  text: string;
  icon: string;
  focusText: string;
  disabledText: string;
  hoverText: string;
  pressedText: string;
};

const styleTokens: Record<DSLinkStyle, StyleTokens> = {
  white: {
    text: "text-white",
    icon: "text-white",
    hoverText: "text-white",
    pressedText: "text-white",
    focusText: "text-white",
    disabledText: "text-[var(--color-transparency-white-50,rgba(255,255,255,0.5))]",
  },
  purple: {
    text: "text-purple-70",
    icon: "text-purple-70",
    hoverText: "text-purple-70",
    pressedText: "text-purple-70",
    focusText: "text-purple-70",
    disabledText: "text-purple-40",
  },
  grey: {
    text: "text-grey-100",
    icon: "text-grey-100",
    hoverText: "text-grey-100",
    pressedText: "text-[var(--color-transparency-grey-50,rgba(18,15,25,0.5))]",
    focusText: "text-grey-100",
    disabledText: "text-[var(--color-text-disabled,#ccc9d6)]",
  },
  "dark-grey": {
    text: "text-grey-100",
    icon: "text-grey-100",
    hoverText: "text-grey-100",
    pressedText: "text-[var(--color-transparency-grey-50,rgba(18,15,25,0.5))]",
    focusText: "text-grey-100",
    disabledText: "text-[var(--color-text-disabled,#ccc9d6)]",
  },
  "medium-grey": {
    text: "text-grey-40",
    icon: "text-grey-40",
    hoverText: "text-grey-40",
    pressedText: "text-grey-40",
    focusText: "text-grey-40",
    disabledText: "text-[var(--color-transparency-white-40,rgba(255,255,255,0.4))]",
  },
  pink: {
    text: "text-pink-40",
    icon: "text-pink-40",
    hoverText: "text-pink-40",
    pressedText: "text-pink-40",
    focusText: "text-pink-40",
    disabledText: "text-pink-10",
  },
};

const baseClass = "relative inline-flex items-center rounded-[var(--radius-2)] outline-none";
const iconWrapperClass = "inline-flex size-4 items-center justify-center";
const labelWrapperClass = "relative inline-flex items-center justify-center";

const sizeClassMap: Record<DSLinkSize, string> = {
  small: "gap-sp-2",
  medium: "gap-sp-4",
  large: "gap-sp-4",
};

const sizeLineHeightClassMap: Record<DSLinkSize, Record<DSLinkPlatform, string>> = {
  small: {
    responsive: "leading-[13px]",
    desktop: "leading-[13px]",
    mobile: "leading-[13px]",
  },
  medium: {
    responsive: "leading-[15px]",
    desktop: "leading-[15px]",
    mobile: "leading-[15px]",
  },
  large: {
    responsive: "leading-[16px] md:leading-[26px]",
    desktop: "leading-[26px]",
    mobile: "leading-[16px]",
  },
};

const sizeHeightClassMap: Record<DSLinkSize, Record<DSLinkPlatform, string>> = {
  small: {
    responsive: "h-[13px]",
    desktop: "h-[13px]",
    mobile: "h-[13px]",
  },
  medium: {
    responsive: "h-[15px]",
    desktop: "h-[15px]",
    mobile: "h-[15px]",
  },
  large: {
    responsive: "h-[16px] md:h-[26px]",
    desktop: "h-[26px]",
    mobile: "h-[16px]",
  },
};

const sizeTypographyClassMap: Record<DSLinkSize, Record<DSLinkPlatform, string>> = {
  small: {
    responsive: "font-medium text-[13px] leading-[13px] tracking-[0.02em] md:tracking-[0.04em]",
    desktop: "font-medium text-[13px] leading-[13px] tracking-[0.04em]",
    mobile: "font-semibold text-[13px] leading-[13px] tracking-[0.02em]",
  },
  medium: {
    responsive: "font-medium text-[14px] leading-[15px] tracking-0 md:text-[15px] md:tracking-[0.02em]",
    desktop: "font-medium text-[15px] leading-[15px] tracking-[0.02em]",
    mobile: "font-semibold text-[14px] leading-[15px] tracking-0",
  },
  large: {
    responsive: "font-medium text-[16px] leading-[16px] tracking-0 md:text-[18px] md:leading-[26px]",
    desktop: "font-medium text-[18px] leading-[26px] tracking-0",
    mobile: "font-semibold text-[16px] leading-[16px] tracking-0",
  },
};

function resolveTextColor(style: DSLinkStyle, state: DSLinkState) {
  const tokens = styleTokens[style];
  if (state === "disabled") return tokens.disabledText;
  if (state === "hover") return tokens.hoverText;
  if (state === "pressed") return tokens.pressedText;
  if (state === "focus") return tokens.focusText;
  return tokens.text;
}

function hasTextUnderline(style: DSLinkStyle, state: DSLinkState) {
  if (state === "hover" && (style === "white" || style === "purple" || style === "medium-grey" || style === "pink")) {
    return true;
  }
  return false;
}

function hasRootUnderline(style: DSLinkStyle, state: DSLinkState) {
  if (style !== "grey" && style !== "dark-grey") return false;
  return state === "enabled" || state === "focus";
}

function renderIcon(icon: React.ReactNode, colorClass: string) {
  if (!icon) return null;
  return <span className={cn(iconWrapperClass, colorClass)}>{icon}</span>;
}

function Link({
  className,
  children = "Link",
  href = "#",
  size = "medium",
  style = "purple",
  state,
  platform = "responsive",
  leftIcon,
  rightIcon,
  onClick,
  ...props
}: DSLinkProps) {
  const interactiveState: DSLinkState = state ?? "enabled";
  const isDisabled = interactiveState === "disabled";

  const textColorClass = resolveTextColor(style, interactiveState);
  const iconColorClass = isDisabled ? styleTokens[style].disabledText : styleTokens[style].icon;
  const focusVisibleClass = isDisabled
    ? ""
    : "focus-visible:shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]";
  const staticFocusClass = interactiveState === "focus"
    ? "shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]"
    : "";
  const hoverClass =
    state === undefined
      ? cn(
          (style === "white" || style === "purple" || style === "medium-grey" || style === "pink") &&
            "hover:[&_span[data-slot='link-label']::after]:opacity-100",
          (style === "grey" || style === "dark-grey") &&
            "hover:[&_span[data-slot='root-underline']]:opacity-0"
        )
      : "";
  const forceSemiboldSmallMediumGrey =
    size === "small" && style === "medium-grey" ? "font-semibold" : "";
  const forceTrackingSmallMediumGrey =
    size === "small" && style === "medium-grey" ? "tracking-[0.5px]" : "";

  return (
    <a
      data-slot="link"
      data-size={size}
      data-style={style}
      data-state={interactiveState}
      href={isDisabled ? undefined : href}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      className={cn(
        baseClass,
        sizeClassMap[size],
        sizeLineHeightClassMap[size][platform],
        sizeHeightClassMap[size][platform],
        isDisabled ? "cursor-default" : "cursor-pointer",
        staticFocusClass,
        focusVisibleClass,
        hoverClass,
        className
      )}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    >
      {renderIcon(leftIcon, iconColorClass)}

      <span
        data-slot="link-label"
        className={cn(
          labelWrapperClass,
          sizeTypographyClassMap[size][platform],
          forceSemiboldSmallMediumGrey,
          forceTrackingSmallMediumGrey,
          textColorClass,
          "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-px after:bg-current after:content-['']",
          hasTextUnderline(style, interactiveState) ? "after:opacity-100" : "after:opacity-0"
        )}
      >
        {children}
      </span>

      {renderIcon(rightIcon, iconColorClass)}

      <span
        data-slot="root-underline"
        className={cn(
          "pointer-events-none absolute bottom-[-1px] left-0 right-0 h-px bg-current",
          textColorClass,
          hasRootUnderline(style, interactiveState) ? "opacity-100" : "opacity-0"
        )}
      />
    </a>
  );
}

export { Link };
