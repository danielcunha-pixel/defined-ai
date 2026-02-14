"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base layout
        "peer relative shrink-0 size-[18px] rounded-[4px] overflow-clip",
        "flex items-center justify-center",
        "outline-none cursor-pointer",
        // Focus ring
        "focus-visible:ring-2 focus-visible:ring-purple-70/50 focus-visible:ring-offset-2",
        // Unchecked enabled
        "border-0 bg-white",
        "shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.15),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        // Unchecked hover
        "hover:shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.3),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        // Unchecked pressed
        "active:shadow-[0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        // Checked / indeterminate enabled
        "data-[state=checked]:bg-purple-70 data-[state=checked]:shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.15),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        "data-[state=indeterminate]:bg-purple-70 data-[state=indeterminate]:shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.15),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        // Checked / indeterminate hover
        "data-[state=checked]:hover:bg-purple-80 data-[state=checked]:hover:shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.3),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        "data-[state=indeterminate]:hover:bg-purple-80 data-[state=indeterminate]:hover:shadow-[0px_2px_1px_-1px_rgba(18,15,25,0.1),0px_1px_2px_0px_rgba(18,15,25,0.3),0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        // Checked / indeterminate pressed
        "data-[state=checked]:active:bg-purple-90 data-[state=checked]:active:shadow-[0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        "data-[state=indeterminate]:active:bg-purple-90 data-[state=indeterminate]:active:shadow-[0px_0px_1px_0px_rgba(18,15,25,0.9)]",
        // Disabled unchecked: border, no shadow
        "disabled:pointer-events-none disabled:bg-white disabled:shadow-none disabled:border disabled:border-grey-20",
        // Disabled checked / indeterminate: grey bg, no shadow
        "disabled:data-[state=checked]:bg-grey-30 disabled:data-[state=checked]:border-0",
        "disabled:data-[state=indeterminate]:bg-grey-30 disabled:data-[state=indeterminate]:border-0",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group flex items-center justify-center text-white size-[16px]"
      >
        <Check
          className="size-[16px] group-data-[state=indeterminate]:hidden"
          strokeWidth={2}
        />
        <Minus
          className="size-[16px] hidden group-data-[state=indeterminate]:block"
          strokeWidth={2}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
