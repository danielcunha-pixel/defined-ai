"use client";

import { Dropdown } from "@/components/ui/dropdown";

const options = [
  { label: "Option", value: "option-1" },
  { label: "Option", value: "option-2" },
  { label: "Option", value: "option-3" },
  { label: "Option", value: "option-4" },
  { label: "Option", value: "option-5" },
];

export function DropdownDemo() {
  return (
    <div className="flex min-h-[320px] items-start pt-sp-24">
      <Dropdown
        size="medium"
        style="default"
        label="Label"
        helperText="Helper text"
        placeholder="Choose an option"
        options={options}
      />
    </div>
  );
}

export function DropdownStatesDemo() {
  return (
    <div className="pointer-events-none flex w-full max-w-[256px] flex-col gap-sp-12">
      <Dropdown previewState="enabled" label="Enabled" helperText="Helper text" placeholder="Choose an option" options={options} />
      <Dropdown previewState="hover" label="Hover" helperText="Helper text" placeholder="Choose an option" options={options} />
      <Dropdown previewState="pressed" label="Pressed" helperText="Helper text" placeholder="Choose an option" options={options} />
      <Dropdown previewState="focus" label="Focus" helperText="Helper text" placeholder="Choose an option" options={options} />
      <Dropdown previewState="active" open label="Active" helperText="Helper text" placeholder="Choose an option" options={options} />
      <Dropdown previewState="disabled" label="Disabled" helperText="Helper text" placeholder="Choose an option" options={options} />
    </div>
  );
}

export function DropdownSizesDemo() {
  return (
    <div className="pointer-events-none flex w-full max-w-[256px] flex-col gap-sp-12">
      <Dropdown size="small" label="Small" helperText="Helper text" placeholder="Choose an option" options={options} />
      <Dropdown size="medium" label="Medium" helperText="Helper text" placeholder="Choose an option" options={options} />
    </div>
  );
}

export function DropdownInlineDemo() {
  return (
    <div className="pointer-events-none flex flex-col items-start gap-sp-12">
      <Dropdown style="inline" size="small" label="Label" placeholder="Choose an option" options={options} />
      <Dropdown style="inline" size="medium" label="Label" value="option-1" options={options} />
      <Dropdown style="inline" size="medium" previewState="focus" open value="option-1" options={options} />
    </div>
  );
}
