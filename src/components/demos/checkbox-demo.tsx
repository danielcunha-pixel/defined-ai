"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-sp-12">
      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox id="terms" />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Accept terms and conditions
        </span>
      </label>
    </div>
  );
}

export function CheckboxStatesDemo() {
  return (
    <div className="flex flex-col gap-sp-24">
      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Unchecked
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox defaultChecked />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Checked
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox checked="indeterminate" />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Indeterminate
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-not-allowed">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox disabled />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-40">
          Disabled unchecked
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-not-allowed">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox disabled defaultChecked />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-40">
          Disabled checked
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-not-allowed">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox disabled checked="indeterminate" />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-40">
          Disabled indeterminate
        </span>
      </label>
    </div>
  );
}

export function CheckboxWithLabelDemo() {
  return (
    <div className="flex flex-col gap-sp-24">
      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox id="marketing" />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Receive marketing emails
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox id="analytics" defaultChecked />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Allow analytics tracking
        </span>
      </label>

      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox id="notifications" />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Enable push notifications
        </span>
      </label>
    </div>
  );
}

export function CheckboxGroupDemo() {
  const [selected, setSelected] = React.useState<string[]>(["read"]);

  const items = [
    { id: "read", label: "Read" },
    { id: "write", label: "Write" },
    { id: "delete", label: "Delete" },
  ];

  const allChecked = items.every((item) => selected.includes(item.id));
  const someChecked = items.some((item) => selected.includes(item.id));

  function toggleAll() {
    setSelected(allChecked ? [] : items.map((item) => item.id));
  }

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  return (
    <div className="flex flex-col gap-sp-16">
      <label className="flex items-start gap-sp-12 cursor-pointer">
        <div className="flex items-center pt-sp-1 shrink-0">
          <Checkbox
            checked={allChecked ? true : someChecked ? "indeterminate" : false}
            onCheckedChange={toggleAll}
          />
        </div>
        <span className="ds-text-body-lg font-medium text-grey-100">
          Select all permissions
        </span>
      </label>

      <div className="ml-sp-24 flex flex-col gap-sp-16">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-sp-12 cursor-pointer"
          >
            <div className="flex items-center pt-sp-1 shrink-0">
              <Checkbox
                checked={selected.includes(item.id)}
                onCheckedChange={() => toggle(item.id)}
              />
            </div>
            <span className="ds-text-body-lg font-medium text-grey-100">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
