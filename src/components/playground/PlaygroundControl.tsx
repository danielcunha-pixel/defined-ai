'use client';

import { PlaygroundControl as PlaygroundControlType, getControlLabel } from './types';
import { Dropdown } from '@/components/ui/dropdown';

interface PlaygroundControlProps {
  name: string;
  control: PlaygroundControlType;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  filteredOptions?: Array<{ label: string; value: string }>;
}

export function PlaygroundControl({
  name,
  control,
  value,
  onChange,
  disabled = false,
  filteredOptions,
}: PlaygroundControlProps) {
  const label = getControlLabel(name);

  if (control.type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <label className={`flex items-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="w-4 h-4 rounded border border-grey-40 cursor-pointer disabled:opacity-50"
          />
          <span className="text-sm font-medium text-grey-80">{label}</span>
        </label>
      </div>
    );
  }

  if (control.type === 'select') {
    const options = filteredOptions || control.options;
    const resolvedValue = typeof value === 'string' ? value : control.defaultValue;

    return (
      <Dropdown
        size="medium"
        style="default"
        label={label}
        value={resolvedValue}
        onValueChange={(nextValue) => onChange(nextValue)}
        options={options}
        showSearch={false}
        helperText={undefined}
        disabled={disabled}
        containerClassName="w-full"
      />
    );
  }

  if (control.type === 'number') {
    const resolvedValue =
      typeof value === 'number' || typeof value === 'string'
        ? value
        : control.defaultValue;

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-grey-80">{label}</label>
        <input
          type="number"
          value={resolvedValue}
          onChange={(e) => onChange(Number(e.target.value))}
          min={control.min}
          max={control.max}
          disabled={disabled}
          className="px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 cursor-pointer hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    );
  }

  if (control.type === 'text') {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-grey-80">{label}</label>
        <input
          type="text"
          value={String(value || control.defaultValue)}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 cursor-pointer hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    );
  }

  return null;
}
