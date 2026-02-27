"use client";

import { FilterButton } from "@/components/ui/filter-button";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Watermelon", value: "watermelon" },
];

export function FilterButtonDefaultDemo() {
  return (
    <div className="flex min-h-[320px] items-start pt-sp-16">
      <FilterButton label="Filter" options={options} />
    </div>
  );
}

export function FilterButtonStatesDemo() {
  return (
    <div className="pointer-events-none flex flex-wrap gap-sp-8">
      <FilterButton label="Enabled" options={options} previewState="enabled" />
      <FilterButton label="Hover" options={options} previewState="hover" />
      <FilterButton label="Pressed" options={options} previewState="pressed" />
      <FilterButton label="Disabled" options={options} previewState="disabled" />
    </div>
  );
}

export function FilterButtonFilledDemo() {
  return (
    <div className="pointer-events-none flex flex-wrap gap-sp-8">
      <FilterButton label="Filter" options={options} previewState="enabled" previewFilled previewCount={1} />
      <FilterButton label="Filter" options={options} previewState="hover" previewFilled previewCount={1} />
      <FilterButton label="Category" options={options} previewState="enabled" previewFilled previewCount={3} />
      <FilterButton label="Category" options={options} previewState="hover" previewFilled previewCount={3} />
      <FilterButton label="Disabled" options={options} previewState="disabled" previewFilled previewCount={2} />
    </div>
  );
}

export function FilterButtonGroupDemo() {
  return (
    <div className="flex min-h-[320px] items-start gap-sp-8 pt-sp-16">
      <FilterButton label="Category" options={options} />
      <FilterButton label="Type" options={options} />
      <FilterButton label="Status" options={options} showSearch={false} />
    </div>
  );
}
