'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaygroundConfig } from './types';
import { PlaygroundControl } from './PlaygroundControl';
import { getStateClasses } from './buttonStateClasses';
import { cn } from '@/lib/utils';

interface ComponentPlaygroundProps {
  Component: React.ComponentType<any>;
  playground: PlaygroundConfig;
  componentName: string;
  children?: ReactNode;
}

/**
 * ComponentPlayground - Prop-first interactive preview
 *
 * Simple control panel mapping directly to component props.
 * No presets. Controls render in order.
 *
 * State simulation:
 * - Visual state (hover/focus/pressed) via data-state attribute
 * - CSS simulates styles without affecting the component
 */
export function ComponentPlayground({
  Component,
  playground,
  componentName,
}: ComponentPlaygroundProps) {
  const searchParams = useSearchParams();
  const [overrides, setOverrides] = useState<Record<string, unknown>>({});
  const [mounted, setMounted] = useState(false);

  // Initialize from URL params on mount
  useEffect(() => {
    setMounted(true);
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

  // Merge: defaults + overrides
  let finalProps = {
    ...playground.defaultProps,
    ...overrides,
  };

  // Apply constraint normalization if defined
  if (playground.constraints?.onPropsChange) {
    finalProps = playground.constraints.onPropsChange(finalProps);
    // Sync overrides with normalized props
    Object.keys(overrides).forEach((key) => {
      if (finalProps[key] !== overrides[key]) {
        overrides[key] = finalProps[key];
      }
    });
  }

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

  // Generate URL with current state
  const generateUrl = () => {
    const params = new URLSearchParams();
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
    // Exclude state, iconPlacement, and data-simulate-state from props (they're simulation/layout only, not real props)
    const propsForClipboard = { ...finalProps };
    delete (propsForClipboard as any).state;
    delete (propsForClipboard as any).iconPlacement;
    delete (propsForClipboard as any)["data-simulate-state"];
    const json = JSON.stringify(propsForClipboard, null, 2);
    navigator.clipboard.writeText(json);
  };

  // Copy URL to clipboard
  const copyUrlToClipboard = () => {
    const url = `${window.location.origin}${generateUrl()}`;
    navigator.clipboard.writeText(url);
  };

  // State for simulation (not a real prop passed to Component)
  const simulationState = String(finalProps.state || 'enabled');

  // Props passed to component (exclude state and iconPlacement)
  // State is purely for visual simulation via CSS, not a real component prop
  const componentProps = { ...finalProps };
  delete (componentProps as any).state;
  delete (componentProps as any).iconPlacement;

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
          Adjust controls to explore different configurations
        </p>
      </div>

      <div className="flex gap-6 p-6">
        {/* Controls Panel */}
        <div className="w-72 flex flex-col gap-4">
          {/* Render controls in order */}
          {Object.entries(playground.controls).map(([key, control]) => {
            const disabled = isControlDisabled(key);
            const filteredOptions =
              control.type === 'select'
                ? getFilteredOptions(key, (control as any).options || [])
                : undefined;

            return (
              <PlaygroundControl
                key={key}
                name={key}
                control={control}
                value={finalProps[key] ?? control.defaultValue}
                disabled={disabled}
                filteredOptions={filteredOptions}
                onChange={(value) => {
                  const updated = { ...overrides, [key]: value };
                  setOverrides(updated);

                  // Recompute finalProps with normalization
                  let newFinal = {
                    ...playground.defaultProps,
                    ...updated,
                  };
                  if (playground.constraints?.onPropsChange) {
                    newFinal = playground.constraints.onPropsChange(newFinal);
                  }
                  // Sync overrides if normalized
                  Object.keys(updated).forEach((k) => {
                    if (newFinal[k] !== updated[k]) {
                      updated[k] = newFinal[k];
                    }
                  });
                }}
              />
            );
          })}

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
          {/* Preview with state simulation */}
          <div className="text-xs text-grey-60 font-medium">PREVIEW</div>

          {/* Preview with state simulation via className injection */}
          <div
            className="flex items-center justify-center min-h-64 bg-gradient-to-br from-grey-5 to-grey-10 rounded-[8px] border border-grey-20 p-4"
            style={{
              // Disable interaction in preview - it's simulation only
              pointerEvents: 'none',
            }}
          >
            {/* State classes are applied directly via className from buttonStateClasses.ts */}
            {componentName === 'Button' ? (
              <Component
                {...componentProps}
                className={cn(
                  componentProps.className,
                  getStateClasses(
                    (finalProps.variant as any) || 'primary',
                    simulationState
                  )
                )}
              >
                {(finalProps.iconPlacement === 'left' || finalProps.iconPlacement === 'right') && !finalProps.iconOnly && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
                {!finalProps.iconOnly && 'Button'}
                {(finalProps.iconPlacement === 'right' || finalProps.iconOnly) && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </Component>
            ) : (
              <Component {...componentProps}>Component</Component>
            )}
          </div>

          {/* Props Display */}
          <div className="text-xs text-grey-60 font-medium">CURRENT PROPS</div>
          <div className="bg-grey-5 rounded-[6px] p-3 border border-grey-20 font-mono text-xs text-grey-80 max-h-40 overflow-y-auto">
            <pre>
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(componentProps).filter(
                    ([, v]) => v !== undefined
                  )
                ),
                null,
                2
              )}
            </pre>
          </div>

          {/* State info */}
          <div className="text-xs text-grey-60 italic">
            State: <strong>{simulationState}</strong> (visual simulation only)
          </div>
        </div>
      </div>
    </div>
  );
}
