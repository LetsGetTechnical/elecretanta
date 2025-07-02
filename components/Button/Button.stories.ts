// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button/button';

const meta = {
  title: 'Button',
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
    },
    size: {
      description: 'The size of the button',
    },
    children: {
      description: 'The content of the button',
    },
    asChild: {
      description: 'Renders as child component if true',
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
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Button',
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
  },
  parameters: {
    backgrounds: { default: 'gray' },
  },
};
