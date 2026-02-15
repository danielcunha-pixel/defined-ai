'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaygroundConfig } from './types';
import { PlaygroundControl } from './PlaygroundControl';

interface ComponentPlaygroundProps {
  Component: React.ComponentType<any>;
  playground: PlaygroundConfig;
  componentName: string;
  children?: ReactNode;
}

// Define control groups for organized UI display
type ControlGroup = 'core' | 'state' | 'icon' | 'modifiers';

interface GroupedControls {
  core: string[];
  state: string[];
  icon: string[];
  modifiers: string[];
}

function getControlGroup(key: string): ControlGroup {
  if (key === 'variant' || key === 'size') return 'core';
  if (key === 'state') return 'state';
  if (key.includes('icon') || key === 'iconAlignment' || key === 'filledIcon')
    return 'icon';
  return 'modifiers';
}

export function ComponentPlayground({
  Component,
  playground,
  componentName,
}: ComponentPlaygroundProps) {
  const searchParams = useSearchParams();
  const [selectedVariant, setSelectedVariant] = useState<string>(
    playground.variants[0]?.name || ''
  );
  const [overrides, setOverrides] = useState<Record<string, unknown>>({});
  const [mounted, setMounted] = useState(false);

  // Initialize from URL params on mount
  useEffect(() => {
    setMounted(true);
    const variant = searchParams.get('variant');
    if (variant) {
      const variantMatch = playground.variants.find((v) =>
        v.name.toLowerCase().replace(/\s+/g, '-').includes(variant.toLowerCase())
      );
      if (variantMatch) {
        setSelectedVariant(variantMatch.name);
      }
    }

    // Load control overrides from URL
    const newOverrides: Record<string, unknown> = {};
    Object.keys(playground.controls).forEach((key) => {
      const param = searchParams.get(key);
      if (param !== null) {
        const control = playground.controls[key];
        if (control.type === 'boolean') {
          newOverrides[key] = param === 'true';
        } else if (control.type === 'number') {
          newOverrides[key] = Number(param);
        } else {
          newOverrides[key] = param;
        }
      }
    });
    if (Object.keys(newOverrides).length > 0) {
      setOverrides(newOverrides);
    }
  }, [searchParams, playground]);

  // Find the selected variant
  const variant = playground.variants.find((v) => v.name === selectedVariant);

  // Merge: variant props + overrides
  let finalProps = {
    ...playground.defaultProps,
    ...(variant?.props || {}),
    ...overrides,
  };

  // Apply constraint normalization if defined
  if (playground.constraints?.onPropsChange) {
    finalProps = playground.constraints.onPropsChange(finalProps);
  }

  // Check if a control should be hidden
  const isControlHidden = (key: string) => {
    if (!playground.constraints?.hidden) return false;
    const hiddenFn = playground.constraints.hidden[key];
    return hiddenFn ? hiddenFn(finalProps) : false;
  };

  // Check if a control should be disabled
  const isControlDisabled = (key: string) => {
    if (!playground.constraints?.disabled) return false;
    const disabledFn = playground.constraints.disabled[key];
    return disabledFn ? disabledFn(finalProps) : false;
  };

  // Get filtered options for select controls
  const getFilteredOptions = (
    key: string,
    options: Array<{ label: string; value: string }>
  ) => {
    if (!playground.constraints?.filterOptions) return options;
    const filterFn = playground.constraints.filterOptions[key];
    return filterFn ? filterFn(options, finalProps) : options;
  };

  // Group controls by category
  const groupedControls: GroupedControls = {
    core: [],
    state: [],
    icon: [],
    modifiers: [],
  };

  Object.keys(playground.controls).forEach((key) => {
    const group = getControlGroup(key);
    groupedControls[group].push(key);
  });

  // Generate URL with current state
  const generateUrl = () => {
    const params = new URLSearchParams();
    if (selectedVariant && playground.variants[0]?.name !== selectedVariant) {
      params.set(
        'variant',
        selectedVariant.toLowerCase().replace(/\s+/g, '-')
      );
    }
    Object.entries(overrides).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    const queryString = params.toString();
    return queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
  };

  // Copy props to clipboard
  const copyPropsToClipboard = () => {
    const json = JSON.stringify(finalProps, null, 2);
    navigator.clipboard.writeText(json);
  };

  // Copy URL to clipboard
  const copyUrlToClipboard = () => {
    const url = `${window.location.origin}${generateUrl()}`;
    navigator.clipboard.writeText(url);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full border border-grey-20 rounded-[12px] bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-grey-20 px-6 py-4">
        <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-1">
          Interactive Playground
        </h2>
        <p className="text-xs text-grey-60">
          Adjust controls and select variants to explore different states
        </p>
      </div>

      <div className="flex gap-6 p-6">
        {/* Controls Panel */}
        <div className="w-80 flex flex-col gap-6 border-r border-grey-20 pr-6 max-h-[700px] overflow-y-auto">
          {/* Variant Selector */}
          {playground.variants.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-grey-80">Variant</label>
              <select
                value={selectedVariant}
                onChange={(e) => {
                  setSelectedVariant(e.target.value);
                  setOverrides({});
                }}
                className="px-3 py-2 border border-grey-40 rounded-[6px] bg-white text-sm text-grey-100 cursor-pointer hover:border-grey-60 focus:outline-none focus:ring-2 focus:ring-purple-70/30"
              >
                {playground.variants.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Control Groups */}

          {/* Core Controls (Type, Size) */}
          {groupedControls.core.length > 0 && (
            <div className="flex flex-col gap-3">
              {groupedControls.core.map((key) => {
                const control = playground.controls[key];
                if (isControlHidden(key)) return null;

                return (
                  <div key={key} className="opacity-100">
                    <PlaygroundControl
                      name={key}
                      control={control}
                      value={finalProps[key] ?? control.defaultValue}
                      disabled={isControlDisabled(key)}
                      filteredOptions={
                        control.type === 'select'
                          ? getFilteredOptions(
                              key,
                              (control as any).options || []
                            )
                          : undefined
                      }
                      onChange={(value) => {
                        setOverrides((prev) => {
                          const updated = { ...prev, [key]: value };
                          // Apply normalization
                          if (playground.constraints?.onPropsChange) {
                            const normalized =
                              playground.constraints.onPropsChange({
                                ...playground.defaultProps,
                                ...(variant?.props || {}),
                                ...updated,
                              });
                            // Sync overrides with normalized props
                            Object.keys(updated).forEach((k) => {
                              if (normalized[k] !== updated[k]) {
                                updated[k] = normalized[k];
                              }
                            });
                          }
                          return updated;
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Visual State Controls */}
          {groupedControls.state.length > 0 && (
            <div className="flex flex-col gap-3 pt-2 border-t border-grey-20">
              <div className="text-xs font-semibold text-grey-60 uppercase tracking-wide">
                Visual State
              </div>
              {groupedControls.state.map((key) => {
                const control = playground.controls[key];
                if (isControlHidden(key)) return null;

                return (
                  <PlaygroundControl
                    key={key}
                    name={key}
                    control={control}
                    value={finalProps[key] ?? control.defaultValue}
                    disabled={isControlDisabled(key)}
                    onChange={(value) => {
                      setOverrides((prev) => ({
                        ...prev,
                        [key]: value,
                      }));
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Icon Controls */}
          {groupedControls.icon.length > 0 && (
            <div className="flex flex-col gap-3 pt-2 border-t border-grey-20">
              <div className="text-xs font-semibold text-grey-60 uppercase tracking-wide">
                Icon Settings
              </div>
              {groupedControls.icon.map((key) => {
                const control = playground.controls[key];
                if (isControlHidden(key)) return null;

                return (
                  <PlaygroundControl
                    key={key}
                    name={key}
                    control={control}
                    value={finalProps[key] ?? control.defaultValue}
                    disabled={isControlDisabled(key)}
                    filteredOptions={
                      control.type === 'select'
                        ? getFilteredOptions(
                            key,
                            (control as any).options || []
                          )
                        : undefined
                    }
                    onChange={(value) => {
                      setOverrides((prev) => {
                        const updated = { ...prev, [key]: value };
                        // Apply normalization
                        if (playground.constraints?.onPropsChange) {
                          const normalized =
                            playground.constraints.onPropsChange({
                              ...playground.defaultProps,
                              ...(variant?.props || {}),
                              ...updated,
                            });
                          // Sync overrides with normalized props
                          Object.keys(updated).forEach((k) => {
                            if (normalized[k] !== updated[k]) {
                              updated[k] = normalized[k];
                            }
                          });
                        }
                        return updated;
                      });
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Modifier Controls */}
          {groupedControls.modifiers.length > 0 && (
            <div className="flex flex-col gap-3 pt-2 border-t border-grey-20">
              <div className="text-xs font-semibold text-grey-60 uppercase tracking-wide">
                Modifiers
              </div>
              {groupedControls.modifiers.map((key) => {
                const control = playground.controls[key];
                if (isControlHidden(key)) return null;

                return (
                  <PlaygroundControl
                    key={key}
                    name={key}
                    control={control}
                    value={finalProps[key] ?? control.defaultValue}
                    disabled={isControlDisabled(key)}
                    onChange={(value) => {
                      setOverrides((prev) => ({
                        ...prev,
                        [key]: value,
                      }));
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4 border-t border-grey-20">
            <button
              onClick={copyPropsToClipboard}
              className="w-full px-3 py-2 text-sm font-medium text-white bg-purple-70 rounded-[6px] hover:bg-purple-80 active:bg-purple-90 transition-colors"
            >
              Copy Props JSON
            </button>
            <button
              onClick={copyUrlToClipboard}
              className="w-full px-3 py-2 text-sm font-medium text-purple-70 border border-purple-70 rounded-[6px] hover:bg-purple-10 transition-colors"
            >
              Copy URL
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-xs text-grey-60 font-medium">PREVIEW</div>
          <div className="flex items-center justify-center min-h-64 bg-gradient-to-br from-grey-5 to-grey-10 rounded-[8px] border border-grey-20">
            <Component {...finalProps}>
              {componentName === 'Button' ? 'Button' : 'Component'}
            </Component>
          </div>

          {/* Props Display */}
          <div className="text-xs text-grey-60 font-medium mt-2">
            CURRENT PROPS
          </div>
          <div className="bg-grey-5 rounded-[6px] p-3 border border-grey-20 font-mono text-xs text-grey-80 max-h-32 overflow-y-auto">
            <pre>{JSON.stringify(finalProps, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
