'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

type InputSize = 'small' | 'medium' | 'large';
type InputVisualState = 'enabled' | 'hover' | 'pressed' | 'disabled' | 'error' | 'read-only';
type PlaygroundState = InputVisualState | 'filled' | 'active';

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
          <ControlLabel label="Size">
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as InputSize)}
              className={controlClassName}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </ControlLabel>

          <ControlLabel label="State">
            <select
              value={state}
              onChange={(e) => setState(e.target.value as PlaygroundState)}
              className={controlClassName}
            >
              <option value="enabled">Enabled</option>
              <option value="filled">Filled</option>
              <option value="active">Active</option>
              <option value="hover">Hover</option>
              <option value="pressed">Pressed</option>
              <option value="disabled">Disabled</option>
              <option value="error">Error</option>
              <option value="read-only">Read-only</option>
            </select>
          </ControlLabel>

          <ControlLabel label="Type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'text' | 'password')}
              className={controlClassName}
            >
              <option value="text">Text</option>
              <option value="password">Password</option>
            </select>
          </ControlLabel>

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
  'px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30';
