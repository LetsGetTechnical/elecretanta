// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';
import React from 'react';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: 'A visual indicator of task completion within the profile building aspect of the app.',
      },
    },
  },
  decorators: [
    // Applies consistent styling (fixed width) around all story variations
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  
  tags: ['autodocs'],
  args: {
    value: 25,
  },
  argTypes: {
    className: {
      control: 'text',
      defaultValue: 'relative h-2 w-screen overflow-hidden rounded-full bg-primary/20',
    },
    value: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
      defaultValue: 25
    },
    indicatorClassName: {
      control: 'text',
      defaultValue: 'h-full w-screen flex-1 bg-[#E26969] transition-all rounded-full',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

// 0% progress
export const Empty: Story = {
  args: {
    value: 0,
  },
};

// 50% progress
export const Halfway: Story = {
  args: {
      value: 50,
  },
};

// 100% progress
export const Full: Story = {
  args: {
      value: 100,
  },
};
