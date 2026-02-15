import * as React from "react";

import { cn } from "@/lib/utils";

type TagColor = "red" | "purple" | "green" | "blue" | "orange" | "grey";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: TagColor;
  darker?: boolean;
  inverted?: boolean;
  truncable?: boolean;
}

const tagBaseClass = [
  "inline-flex h-[22px] max-w-full items-center rounded-[8px]",
  "px-sp-8 py-0",
].join(" ");

const tagLabelBaseClass = [
  "inline-flex min-w-0 max-w-full items-center justify-center",
  "ds-text-ui-tag font-medium",
].join(" ");

const tagToneClasses: Record<TagColor, { light: string; dark: string; text: string }> = {
  red: {
    light: "bg-red-10",
    dark: "bg-red-20",
    text: "text-red-100",
  },
  purple: {
    light: "bg-purple-10",
    dark: "bg-purple-20",
    text: "text-purple-100",
  },
  green: {
    light: "bg-green-10",
    dark: "bg-green-20",
    text: "text-green-100",
  },
  blue: {
    light: "bg-blue-10",
    dark: "bg-blue-20",
    text: "text-blue-100",
  },
  orange: {
    light: "bg-orange-10",
    dark: "bg-orange-20",
    text: "text-orange-100",
  },
  grey: {
    light: "bg-grey-20",
    dark: "bg-grey-30",
    text: "text-grey-100",
  },
};

function Tag({
  className,
  color = "red",
  darker = false,
  inverted = false,
  truncable = false,
  children = "Label",
  ...props
}: TagProps) {
  const normalizedColor: TagColor = color;
  const tone = tagToneClasses[normalizedColor];

  const isInvertedGrey = inverted && normalizedColor === "grey" && !darker;
  const containerClass = isInvertedGrey
    ? "bg-transparent border border-white"
    : darker
      ? tone.dark
      : tone.light;
  const textClass = isInvertedGrey ? "text-white" : tone.text;

  return (
    <span
      data-slot="tag"
      data-color={normalizedColor}
      data-darker={darker}
      data-inverted={isInvertedGrey}
      data-truncable={truncable}
      className={cn(tagBaseClass, containerClass, className)}
      {...props}
    >
      <span className={cn(tagLabelBaseClass, textClass)}>
        <span className={cn(truncable && "min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap")}>
          {children}
        </span>
      </span>
    </span>
  );
}

export { Tag };
