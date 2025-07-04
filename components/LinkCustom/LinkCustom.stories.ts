// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import LinkCustom from './LinkCustom';

const meta = {
  title: 'Components/LinkCustom',
  component: LinkCustom,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The LinkCustom component is a custom link component for navigation links.',
      },
    },
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    href: { description: 'The URL to link to' },
    children: {
      description: 'The content (labels and icons)to display inside the link',
    },
    className: { description: 'The class name to apply to the link' },
  },
} satisfies Meta<typeof LinkCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'Link',
  },
};

export const WithCustomClasses: Story = {
  args: {
    href: '/',
    children: 'Link',
    className: 'border-4 border-red-500 bg-blue-500 px-4 py-2',
  },
};
