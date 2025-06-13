// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import '/app/globals.css'
import { Input } from "./Input";

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The Input component is an accessible, customizable field for capturing user input, including text entries and multi-select options such as checkboxes. It offers flexibility for use in forms and search interfaces.',
      },
    },
  },
  argTypes: {
    type: { description: 'Type of value the input accepts' },
    placeholder: { description: 'Placeholder text' },
  },
} satisfies Meta<typeof Input>;
  
export default meta;
  type Story = StoryObj<typeof meta>;
  
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const WithCustomClasses: Story = {
  args:{
    type: 'text',
    placeholder: 'Custom styled input',
    className: 'border-4 border-red-500 bg-yellow-100',
  },
};