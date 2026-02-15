'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ComponentPlayground } from './ComponentPlayground';
import { checkboxPlaygroundConfig } from '@/components/ui/checkbox.playground';

export function CheckboxPlaygroundWrapper() {
  return (
    <ComponentPlayground
      Component={CheckboxWithLabel}
      playground={checkboxPlaygroundConfig}
      componentName="Checkbox"
    />
  );
}

// Wrapper component that combines Checkbox + label for playground
function CheckboxWithLabel({
  checked,
  indeterminate,
  disabled,
  label,
  ...props
}: any) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={indeterminate ? 'indeterminate' : checked}
        onCheckedChange={() => {}} // Playground handles state
        disabled={disabled}
        {...props}
      />
      {label && (
        <label className="ds-text-body-md font-regular text-grey-100 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}
