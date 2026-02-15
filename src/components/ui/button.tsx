import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap transition-all",
    "rounded-[8px] overflow-clip relative",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
    "outline-none focus-visible:ring-2 focus-visible:ring-purple-70/50 focus-visible:ring-offset-2",
    "shrink-0 cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-purple-70 text-white",
          "shadow-[0px_2px_4px_0px_rgba(18,15,25,0.3),0px_0.5px_1px_0px_rgba(18,15,25,0.4)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)] after:pointer-events-none",
          "hover:bg-purple-80 active:bg-purple-90",
        ].join(" "),
        secondary: [
          "bg-grey-60 text-white",
          "shadow-[0px_1px_1px_0px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.15),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
          "hover:bg-grey-80 hover:shadow-[0px_1px_1px_0px_rgba(18,15,25,0.1),0px_1px_4px_0px_rgba(18,15,25,0.3),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
          "active:bg-grey-90 active:shadow-none",
        ].join(" "),
        tertiary: [
          "bg-white text-grey-100",
          "border border-t-grey-20",
          "hover:bg-grey-10 active:bg-grey-20",
        ].join(" "),
        ghost: [
          "bg-transparent text-grey-100",
          "hover:bg-grey-20 active:bg-grey-20",
        ].join(" "),
        "ghost-secondary": [
          "bg-transparent text-white",
          "hover:bg-t-white-10 active:bg-t-white-20",
        ].join(" "),
        "primary-inverted": [
          "bg-white text-grey-100",
          "shadow-[0px_0px_0px_1px_rgba(18,15,25,0.1),0px_2px_2px_-1px_rgba(18,15,25,0.4),0px_3px_4px_-1px_rgba(18,15,25,0.2)]",
          "hover:bg-grey-20 hover:shadow-[0px_0px_0px_1px_rgba(18,15,25,0.1),0px_2px_2px_-1px_rgba(18,15,25,0.4),0px_3px_4px_-1px_rgba(18,15,25,0.4)]",
          "active:bg-white active:shadow-none",
        ].join(" "),
        "primary-footer": [
          "bg-purple-70 text-white",
          "shadow-[0px_2px_4px_0px_rgba(18,15,25,0.3),0px_0.5px_1px_0px_rgba(18,15,25,0.4)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3)] after:pointer-events-none",
          "hover:bg-purple-80 active:bg-purple-90",
        ].join(" "),
        glass: [
          "bg-transparent text-white",
          "border border-t-white-40",
          "shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.05),0px_2px_6px_0px_rgba(18,15,25,0.05),0px_0px_0px_1px_rgba(18,15,25,0.05)]",
          "hover:bg-t-white-10 active:bg-t-white-20",
        ].join(" "),
        link: "text-purple-70 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 gap-sp-8 px-sp-14 ds-text-ui-button-md font-semibold",
        md: "h-10 gap-sp-8 px-sp-14 ds-text-ui-button-md font-semibold",
        lg: "h-11 gap-sp-8 px-sp-18 ds-text-ui-button-md font-semibold",
        xl: "h-14 px-sp-24 ds-text-ui-button-lg font-semibold",
        "icon-sm": "size-9",
        "icon-md": "size-10",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
