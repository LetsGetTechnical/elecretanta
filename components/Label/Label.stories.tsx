// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/Label/Label';
import { Input } from '@/components/Input/Input';
import { Textarea } from '@/components/TextArea/textarea';

import type { JSX } from 'react';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A customizable Label Component',
      },
    },
  },
  argTypes: {
    className: {
      control: { type: 'select' },
      options: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-red-500', 'font-bold'],
      description: 'The style of the label',
      defaultValue: 'text-sm',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the input the label is associated with',
    },
    children: {
      control: 'text',
      description: 'Text content for the label',
      type: 'string',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: 'defaultLabel',
    children: 'Default Label',
  },
};

export const ExtraSmall: Story = {
  args: {
    htmlFor: 'smallLabel',
    children: 'Small Label',
    className: 'text-xs',
  },
};

export const Large: Story = {
  args: {
    htmlFor: 'largeLabel',
    children: 'Large Label',
    className: 'text-lg',
  },
};

export const WithInputElement: Story = {
  args: {
    htmlFor: 'nameInput',
    children: 'Label With Input',
  },
  /**
   * Renders WithInputElement Story
   * @param args - Args for the Story
   * @returns {JSX.Element} the rendered JSX Element
   */
  render: (args): JSX.Element => (
    <div>
      <Label {...args} />
      <Input id={args.htmlFor} />
    </div>
  ),
};

export const WithTextAreaElement: Story = {
  args: {
    htmlFor: 'nameInput',
    children: 'Label With Text Area',
  },
  /**
   * Renders WithTextAreaElement Story
   * @param args - Args for the Story
   * @returns {JSX.Element} the rendered JSX Element
   */
  render: (args): JSX.Element => (
    <div>
      <Label {...args} />
      <Textarea id={args.htmlFor} />
    </div>
  ),
};

export const WithDisabledInput: Story = {
  args: {
    htmlFor: 'nameInput',
    children: 'Label For Disabled Input',
  },
  /**
   * Renders WithDisabledInput Story
   * @param args - Args for the Story
   * @returns {JSX.Element} the rendered JSX Element
   */
  render: (args): JSX.Element => (
    <div className="flex flex-col-reverse gap-1">
      <Input id={args.htmlFor} disabled className="peer" />
      <Label {...args} />
    </div>
  ),
};
