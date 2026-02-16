'use client';

import { useState } from 'react';
import { Dropdown } from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';

type InputSize = 'small' | 'medium' | 'large';
type InputVisualState = 'enabled' | 'hover' | 'pressed' | 'disabled' | 'error' | 'read-only';
type PlaygroundState = InputVisualState | 'filled' | 'active';

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

const stateOptions = [
  { label: 'Enabled', value: 'enabled' },
  { label: 'Filled', value: 'filled' },
  { label: 'Active', value: 'active' },
  { label: 'Hover', value: 'hover' },
  { label: 'Pressed', value: 'pressed' },
  { label: 'Disabled', value: 'disabled' },
  { label: 'Error', value: 'error' },
  { label: 'Read-only', value: 'read-only' },
];

const typeOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Password', value: 'password' },
];

export function InputPlaygroundWrapper() {
  const [size, setSize] = useState<InputSize>('small');
  const [state, setState] = useState<PlaygroundState>('enabled');
  const [type, setType] = useState<'text' | 'password'>('text');

  const resolvedState: InputVisualState =
    state === 'filled' || state === 'active' ? 'enabled' : state;
  const resolvedFilled = state === 'filled';
  const resolvedActive = state === 'active';
  const previewStateProp: InputVisualState | undefined =
    state === 'enabled' || state === 'filled' || state === 'active'
      ? undefined
      : resolvedState;
  const previewDefaultValue =
    type === 'password'
      ? 'Password123'
      : resolvedFilled || state === 'read-only'
        ? 'Placeholder filled'
        : '';

  return (
    <div className="w-full border border-grey-20 rounded-[12px] bg-white overflow-hidden">
      <div className="border-b border-grey-20 px-6 py-4">
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-1">
          Interactive Playground
        </h2>
        <p className="text-xs text-grey-60">
          Adjust controls to test the Text input component live
        </p>
      </div>

      <div className="flex gap-6 p-6">
        <div className="w-72 flex flex-col gap-3">
          <Dropdown
            size="medium"
            style="default"
            label="Size"
            value={size}
            onValueChange={(nextValue) => setSize(nextValue as InputSize)}
            options={sizeOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="State"
            value={state}
            onValueChange={(nextValue) => setState(nextValue as PlaygroundState)}
            options={stateOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

          <Dropdown
            size="medium"
            style="default"
            label="Type"
            value={type}
            onValueChange={(nextValue) => setType(nextValue as 'text' | 'password')}
            options={typeOptions}
            showSearch={false}
            helperText={undefined}
            containerClassName="w-full"
          />

        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xs text-grey-60 font-medium">PREVIEW</div>
          <div className="min-h-64 bg-gradient-to-br from-grey-5 to-grey-10 rounded-[8px] border border-grey-20 p-6 flex items-start justify-center">
            <div className="w-full max-w-[256px]">
              <Input
                size={size}
                state={previewStateProp}
                type={type}
                label="Label"
                placeholder="Placeholder text"
                helperText="Helper text"
                errorMessage="Error message"
                defaultValue={previewDefaultValue}
                filled={resolvedFilled}
                active={resolvedActive}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
