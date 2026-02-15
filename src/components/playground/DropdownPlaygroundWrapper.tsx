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
          <ControlLabel label="Size">
            <select value={size} onChange={(e) => setSize(e.target.value as DropdownSize)} className={controlClassName}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
            </select>
          </ControlLabel>

          <ControlLabel label="Style">
            <select value={style} onChange={(e) => setStyle(e.target.value as DropdownVisualStyle)} className={controlClassName}>
              <option value="default">Default</option>
              <option value="inline">Inline</option>
            </select>
          </ControlLabel>

          <ControlLabel label="State">
            <select
              value={previewState}
              onChange={(e) => setPreviewState(e.target.value as DropdownPreviewState)}
              className={controlClassName}
            >
              <option value="enabled">Enabled</option>
              <option value="hover">Hover</option>
              <option value="pressed">Pressed</option>
              <option value="focus">Focus</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </ControlLabel>

          <ControlLabel label="Menu Alignment">
            <select
              value={menuAlignment}
              onChange={(e) => setMenuAlignment(e.target.value as MenuAlignment)}
              className={controlClassName}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </ControlLabel>

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

function ControlLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-grey-80">{label}</span>
      {children}
    </div>
  );
}

const controlClassName =
  "px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30";
