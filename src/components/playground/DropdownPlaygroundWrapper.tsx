"use client";

import { useMemo, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown";

type DropdownSize = "small" | "medium";
type DropdownVisualStyle = "default" | "inline";
type DropdownPreviewState = "enabled" | "hover" | "pressed" | "focus" | "active" | "disabled";
type MenuAlignment = "left" | "right";

const options = [
  { label: "Option", value: "option-1" },
  { label: "Option", value: "option-2" },
  { label: "Option", value: "option-3" },
  { label: "Option", value: "option-4" },
  { label: "Option", value: "option-5" },
];

const sizeOptions = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
];

const styleOptions = [
  { label: "Default", value: "default" },
  { label: "Inline", value: "inline" },
];

const stateOptions = [
  { label: "Enabled", value: "enabled" },
  { label: "Hover", value: "hover" },
  { label: "Pressed", value: "pressed" },
  { label: "Focus", value: "focus" },
  { label: "Active", value: "active" },
  { label: "Disabled", value: "disabled" },
];

const menuAlignmentOptions = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
];

export function DropdownPlaygroundWrapper() {
  const [size, setSize] = useState<DropdownSize>("medium");
  const [style, setStyle] = useState<DropdownVisualStyle>("default");
  const [previewState, setPreviewState] = useState<DropdownPreviewState>("enabled");
  const [hasValue, setHasValue] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [menuAlignment, setMenuAlignment] = useState<MenuAlignment>("left");

  const resolvedOpen = previewState === "active";
  const resolvedValue = hasValue ? "option-1" : undefined;

  const helperText = useMemo(() => (style === "default" ? "Helper text" : undefined), [style]);

  return (
    <div className="w-full border border-grey-20 rounded-[12px] bg-white overflow-hidden">
      <div className="border-b border-grey-20 px-6 py-4">
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-1">Interactive Playground</h2>
        <p className="text-xs text-grey-60">Adjust controls to test the Dropdown component live</p>
      </div>

      <div className="flex gap-6 p-6">
        <div className="w-72 flex flex-col gap-3">
          <Dropdown
            size="medium"
            style="default"
            label="Size"
            value={size}
            onValueChange={(nextValue) => setSize(nextValue as DropdownSize)}
            options={sizeOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="Style"
            value={style}
            onValueChange={(nextValue) => setStyle(nextValue as DropdownVisualStyle)}
            options={styleOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="State"
            value={previewState}
            onValueChange={(nextValue) => setPreviewState(nextValue as DropdownPreviewState)}
            options={stateOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="Menu Alignment"
            value={menuAlignment}
            onValueChange={(nextValue) => setMenuAlignment(nextValue as MenuAlignment)}
            options={menuAlignmentOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <label className="flex items-center gap-2 text-sm font-medium text-grey-80">
            <input
              type="checkbox"
              checked={hasValue}
              onChange={(e) => setHasValue(e.target.checked)}
              className="size-4 rounded border border-grey-40"
            />
            Has value
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-grey-80">
            <input
              type="checkbox"
              checked={showSearch}
              onChange={(e) => setShowSearch(e.target.checked)}
              className="size-4 rounded border border-grey-40"
            />
            Show search
          </label>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xs text-grey-60 font-medium">PREVIEW</div>
          <div className="min-h-64 bg-gradient-to-br from-grey-5 to-grey-10 rounded-[8px] border border-grey-20 p-6 flex items-start justify-center">
            {style === "default" ? (
              <Dropdown
                size={size}
                style={style}
                previewState={previewState}
                open={resolvedOpen}
                menuAlignment={menuAlignment}
                label="Label"
                helperText={helperText}
                placeholder="Choose an option"
                value={resolvedValue}
                showSearch={showSearch}
                options={options}
              />
            ) : (
              <Dropdown
                size={size}
                style={style}
                previewState={previewState}
                open={resolvedOpen}
                menuAlignment={menuAlignment}
                label="Label"
                placeholder="Choose an option"
                value={resolvedValue}
                showSearch={showSearch}
                options={options}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
