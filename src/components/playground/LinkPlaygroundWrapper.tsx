"use client";

import { useState } from "react";

import { IconPlaceholder } from "@/components/icons";
import { Dropdown } from "@/components/ui/dropdown";
import { Link, type DSLinkPlatform, type DSLinkSize, type DSLinkState, type DSLinkStyle } from "@/components/ui/link";

const sizeOptions = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const styleOptions = [
  { label: "White", value: "white" },
  { label: "Purple", value: "purple" },
  { label: "Grey", value: "grey" },
  { label: "Dark grey", value: "dark-grey" },
  { label: "Medium grey", value: "medium-grey" },
  { label: "Pink", value: "pink" },
];

const stateOptions = [
  { label: "Enabled", value: "enabled" },
  { label: "Hover", value: "hover" },
  { label: "Pressed", value: "pressed" },
  { label: "Focus", value: "focus" },
  { label: "Disabled", value: "disabled" },
];

const platformOptions = [
  { label: "Responsive", value: "responsive" },
  { label: "Desktop", value: "desktop" },
  { label: "Mobile", value: "mobile" },
];

export function LinkPlaygroundWrapper() {
  const [size, setSize] = useState<DSLinkSize>("medium");
  const [style, setStyle] = useState<DSLinkStyle>("purple");
  const [state, setState] = useState<DSLinkState>("enabled");
  const [platform, setPlatform] = useState<DSLinkPlatform>("responsive");
  const [leftIcon, setLeftIcon] = useState(false);
  const [rightIcon, setRightIcon] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-grey-20 bg-white">
      <div className="border-b border-grey-20 px-6 py-4">
        <h2 className="ds-text-heading-md mb-1 font-semibold text-grey-100">Interactive Playground</h2>
        <p className="text-xs text-grey-60">Adjust controls to test the Link component live</p>
      </div>

      <div className="flex gap-6 p-6 max-md:flex-col">
        <div className="flex w-72 flex-col gap-3 max-md:w-full">
          <Dropdown
            size="medium"
            style="default"
            label="Size"
            value={size}
            onValueChange={(next) => setSize(next as DSLinkSize)}
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
            onValueChange={(next) => setStyle(next as DSLinkStyle)}
            options={styleOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="State"
            value={state}
            onValueChange={(next) => setState(next as DSLinkState)}
            options={stateOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="Platform"
            value={platform}
            onValueChange={(next) => setPlatform(next as DSLinkPlatform)}
            options={platformOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <label className="flex items-center gap-2 text-sm font-medium text-grey-80">
            <input
              type="checkbox"
              checked={leftIcon}
              onChange={(event) => setLeftIcon(event.target.checked)}
              className="size-4 rounded border border-grey-40"
            />
            Left icon
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-grey-80">
            <input
              type="checkbox"
              checked={rightIcon}
              onChange={(event) => setRightIcon(event.target.checked)}
              className="size-4 rounded border border-grey-40"
            />
            Right icon
          </label>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="text-xs font-medium text-grey-60">PREVIEW</div>
          <div className="flex min-h-48 items-center justify-center rounded-[8px] border border-grey-20 bg-gradient-to-br from-grey-5 to-grey-10 p-6">
            <Link
              href="#"
              size={size}
              style={style}
              state={state}
              platform={platform}
              leftIcon={leftIcon ? <IconPlaceholder size="sm" /> : undefined}
              rightIcon={rightIcon ? <IconPlaceholder size="sm" /> : undefined}
            >
              Link
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
