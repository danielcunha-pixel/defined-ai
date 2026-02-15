/**
 * Button State Classes
 *
 * Maps playground state selections to the exact Tailwind classes
 * that Button's CVA variant already uses for hover/active/focus/disabled.
 * This ensures playground state simulation matches the real Button styling 1:1.
 */

type StateType = 'enabled' | 'hover' | 'pressed' | 'focus' | 'disabled';
type VariantType = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'ghost-secondary' | 'primary-inverted' | 'primary-footer' | 'glass' | 'link';

// Extracted from Button CVA: hover and active classes per variant
const variantStateClasses: Record<VariantType, Record<StateType, string>> = {
  primary: {
    enabled: '',
    hover: 'bg-purple-80 shadow-[0px_2px_4px_0px_rgba(18,15,25,0.3),0px_0.5px_1px_0px_rgba(18,15,25,0.4)]',
    pressed: 'bg-purple-90 shadow-none',
    focus: '',
    disabled: '',
  },
  secondary: {
    enabled: '',
    hover: 'bg-grey-80 shadow-[0px_1px_1px_0px_rgba(18,15,25,0.1),0px_1px_4px_0px_rgba(18,15,25,0.3),0px_0px_1px_0px_rgba(18,15,25,0.9)]',
    pressed: 'bg-grey-90 shadow-none',
    focus: '',
    disabled: '',
  },
  tertiary: {
    enabled: '',
    hover: 'bg-grey-10',
    pressed: 'bg-grey-20',
    focus: '',
    disabled: '',
  },
  ghost: {
    enabled: '',
    hover: 'bg-grey-20',
    pressed: 'bg-grey-30',
    focus: '',
    disabled: '',
  },
  'ghost-secondary': {
    enabled: '',
    hover: '[&:hover]:bg-t-white-10',
    pressed: '[&:active]:bg-t-white-20',
    focus: '',
    disabled: '',
  },
  'primary-inverted': {
    enabled: '',
    hover: 'bg-grey-20 shadow-[0px_0px_0px_1px_rgba(18,15,25,0.1),0px_2px_2px_-1px_rgba(18,15,25,0.4),0px_3px_4px_-1px_rgba(18,15,25,0.4)]',
    pressed: 'bg-white shadow-none',
    focus: '',
    disabled: '',
  },
  'primary-footer': {
    enabled: '',
    hover: 'bg-purple-80',
    pressed: 'bg-purple-90',
    focus: '',
    disabled: '',
  },
  glass: {
    enabled: '',
    hover: '[&:hover]:bg-t-white-10',
    pressed: '[&:active]:bg-t-white-20',
    focus: '',
    disabled: '',
  },
  link: {
    enabled: '',
    hover: 'underline',
    pressed: '',
    focus: '',
    disabled: '',
  },
};

// Focus ring is same for all variants
const focusClasses = 'outline outline-2 outline-purple-70/50 outline-offset-2';

/**
 * Get the state classes for a given variant and state.
 * Returns a string of Tailwind classes to apply for state simulation.
 */
export function getStateClasses(variant: VariantType, state: StateType): string {
  if (state === 'disabled') {
    return 'opacity-50 cursor-not-allowed';
  }

  if (state === 'focus') {
    return focusClasses;
  }

  const stateClass = variantStateClasses[variant][state];
  return stateClass;
}
