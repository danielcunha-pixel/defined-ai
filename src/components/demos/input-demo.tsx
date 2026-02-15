"use client";

import { Input } from "@/components/ui/input";

export function InputDemo() {
  return (
    <div className="flex w-full max-w-[256px] flex-col gap-sp-6">
      <Input
        label="Label"
        placeholder="Placeholder text"
        helperText="Helper text"
        size="small"
      />
    </div>
  );
}

export function InputSizesDemo() {
  return (
    <div className="pointer-events-none flex w-full max-w-[256px] flex-col gap-sp-12">
      <Input label="Small" placeholder="Placeholder text" helperText="Helper text" size="small" tabIndex={-1} />
      <Input label="Medium" placeholder="Placeholder text" helperText="Helper text" size="medium" tabIndex={-1} />
      <Input label="Large" placeholder="Placeholder text" helperText="Helper text" size="large" tabIndex={-1} />
    </div>
  );
}

export function InputStatesDemo() {
  return (
    <div className="pointer-events-none flex w-full max-w-[256px] flex-col gap-sp-12">
      <Input label="Enabled" placeholder="Placeholder text" helperText="Helper text" state="enabled" tabIndex={-1} />
      <Input label="Hover" placeholder="Placeholder text" helperText="Helper text" state="hover" tabIndex={-1} />
      <Input label="Pressed" placeholder="Placeholder text" helperText="Helper text" state="pressed" tabIndex={-1} />
      <Input label="Disabled" placeholder="Placeholder text" helperText="Helper text" state="disabled" tabIndex={-1} />
      <Input label="Read-only" defaultValue="Placeholder filled" helperText="Helper text" state="read-only" tabIndex={-1} />
      <Input
        label="Error"
        placeholder="Placeholder text"
        state="error"
        errorMessage="Error message"
        tabIndex={-1}
      />
    </div>
  );
}
