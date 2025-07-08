// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button/button';

import type { JSX } from 'react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `A customizable Button Component.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The style of the button',
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      description: 'The size of the button',
      control: { type: 'radio' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: {
      description: 'The content of the button',
    },
    asChild: {
      description: 'Renders as child component if true',
      control: 'boolean',
    },
    disabled: {
      description: 'The disabled state of the button',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'green' },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'green' },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'gray' },
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'gray' },
  },
};

export const AsChild = {
  /**
   * Renders the AsChild story.
   * @returns {JSX.Element} The rendered JSX element.
   */
  render: (): JSX.Element => (
    <Button asChild>
      <a href="https://example.com">Link Button</a>
    </Button>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const WithIcon = {
  /**
   * Renders WithIcon story.
   * @returns {JSX.Element} The rendered JSX element.
   */
  render: (): JSX.Element => (
    <Button size="icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M4 12H20M12 4V20"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{' '}
        </g>
      </svg>
    </Button>
  ),
  parameters: {
    controls: { disable: true },
  },
};
