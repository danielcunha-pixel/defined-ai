'use client';

import { PlaygroundControl as PlaygroundControlType, getControlLabel } from './types';

interface PlaygroundControlProps {
  name: string;
  control: PlaygroundControlType;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function PlaygroundControl({
  name,
  control,
  value,
  onChange,
}: PlaygroundControlProps) {
  const label = getControlLabel(name);

  if (control.type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border border-grey-40 cursor-pointer"
          />
          <span className="text-sm font-medium text-grey-80">{label}</span>
        </label>
      </div>
    );
  }

  if (control.type === 'select') {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-grey-80">{label}</label>
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 cursor-pointer hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30"
        >
          {control.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (control.type === 'number') {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-grey-80">{label}</label>
        <input
          type="number"
          value={value === undefined ? control.defaultValue : value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={control.min}
          max={control.max}
          className="px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 cursor-pointer hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30"
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
          className="px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 cursor-pointer hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30"
        />
      </div>
    );
  }

  return null;
}
