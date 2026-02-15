import { PlaygroundConfig } from '@/components/playground/types';

/**
 * Button Component Playground Configuration
 *
 * This config defines the interactive playground for the Button component,
 * including default props, interactive controls, and preset variants.
 */
export const buttonPlaygroundConfig: PlaygroundConfig = {
  defaultProps: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },

  controls: {
    variant: {
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary', value: 'tertiary' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Ghost Secondary', value: 'ghost-secondary' },
        { label: 'Primary Inverted', value: 'primary-inverted' },
        { label: 'Primary Footer', value: 'primary-footer' },
        { label: 'Glass', value: 'glass' },
        { label: 'Link', value: 'link' },
      ],
      defaultValue: 'primary',
    },

    size: {
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      defaultValue: 'md',
    },

    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
  },

  variants: [
    {
      name: 'Primary (Default)',
      props: { variant: 'primary', size: 'md' },
    },
    {
      name: 'Primary Small',
      props: { variant: 'primary', size: 'sm' },
    },
    {
      name: 'Secondary Medium',
      props: { variant: 'secondary', size: 'md' },
    },
    {
      name: 'Ghost Large',
      props: { variant: 'ghost', size: 'lg' },
    },
    {
      name: 'Tertiary Extra Large',
      props: { variant: 'tertiary', size: 'xl' },
    },
    {
      name: 'Glass',
      props: { variant: 'glass', size: 'md' },
    },
    {
      name: 'Link',
      props: { variant: 'link', size: 'md' },
    },
  ],
};
