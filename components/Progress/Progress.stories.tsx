// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from './progress';

import * as React from 'react';

const meta = {
  title: 'Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    )  ],
  argTypes: {
    className: {
      control: 'text',
      defaultValue: 'relative h-2 w-screen overflow-hidden rounded-full bg-primary/20',
    },
    value: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
    },
    indicatorClassName: {
      control: 'text',
      defaultValue: 'h-full w-screen flex-1 bg-[#E26969] transition-all rounded-full',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Halfway: Story = {
    args: {
      value: 50,
    },
  };

  export const Full: Story = {
    args: {
      value: 100,
    },
  };
