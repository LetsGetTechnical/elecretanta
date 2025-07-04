// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from "./Input";

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An accessible, customizable field for capturing user input, including text entries and multi-select options such as checkboxes. It offers flexibility for use in forms and search interfaces.',
      },
    },
  },
  argTypes: {
    type: { description: 'Type of value the input accepts' },
    placeholder: { description: 'Placeholder text' },
  },
} satisfies Meta<typeof Input>;
  
export default meta;
  type Story = StoryObj<typeof Input>;
  
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Secret Santa',
    className: 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
  },
};

export const WithCustomClasses: Story = {
  args:{
    type: 'text',
    placeholder: 'Custom styled input',
    className: 'border-4 border-red-500 bg-yellow-100',
  },
};