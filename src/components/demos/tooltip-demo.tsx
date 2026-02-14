"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Trash2, Settings, Info, Bold, Italic, Underline } from "lucide-react";

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="primary" size="icon-md" aria-label="Add item">
            <Plus className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="icon-md" aria-label="Settings">
            <Settings className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-md" aria-label="Delete">
            <Trash2 className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function TooltipSidesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="sm">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="sm">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="sm">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="sm">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function TooltipWithTextDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 ds-text-body-md font-medium text-grey-70 cursor-default">
            Hover me
            <Info className="size-3.5 text-grey-40" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          This is additional context that appears on hover.
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function TooltipToolbarDemo() {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-[8px] border border-grey-20 bg-white p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Bold">
            <Bold className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Bold</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Italic">
            <Italic className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Italic</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Underline">
            <Underline className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Underline</TooltipContent>
      </Tooltip>
    </div>
  );
}
