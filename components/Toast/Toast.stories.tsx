// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { ToastProvider } from '../ToastProvider/ToastProvider';
import { ToastViewport } from '../ToastViewport/ToastViewport';
import { ToastTitle } from '../ToastTitle/ToastTitle';
import { ToastDescription } from '../ToastDescription/ToastDescription';
import { ToastAction } from '../ToastAction/ToastAction';
import { ToastClose } from '../ToastClose/ToastClose';
import { ToastVariants } from './Toast.enum';
import type { JSX } from 'react';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    (Story): JSX.Element => (
      <div className="relative h-[200px] w-[500px] rounded-md p-4">
        <ToastProvider>
          <Story />
          <ToastViewport className="absolute inset-0 flex flex-col items-center justify-center w-full" />
        </ToastProvider>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `A customizable Toast Component.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The style of the toast',
      control: { type: 'select' },
      options: [
        'default',
        'error',
        'warning',
        'success',
      ],
    },
    duration: {
      description: 'Auto-dismiss delay in milliseconds',
      control: 'number',
      defaultValue: 5000,
    },
    open: {
      description: 'Determines whether toast is visible',
      control: { type: 'boolean' },
    },
    forceMount: {
      description: 'Renders as child component if true',
      control: { type: 'boolean' },
    },
    className: {
      description: 'Classes for additional styling',
      type: 'string',
    },
    children: {
      control: 'text',
      description: 'Toast content',
      type: 'string',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: ToastVariants.Default,
    duration: 5000,
    defaultOpen: true,
    children: (
      <>
        <div className="flex-grow">
          <ToastTitle>Default Toast</ToastTitle>
          <ToastDescription>This is a notification.</ToastDescription>
        </div>
        <ToastClose />
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    variant: ToastVariants.Error,
    defaultOpen: true,
    children: (
      <>
        <div className="flex-grow">
          <ToastTitle>Error Toast</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
          <ToastClose />
        </div>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: ToastVariants.Warning,
    defaultOpen: true,
    children: (
      <>
        <div className="flex-grow">
          <ToastTitle>Warning Toast</ToastTitle>
          <ToastDescription>Something might need attention.</ToastDescription>
          <ToastClose />
        </div>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: ToastVariants.Success,
    defaultOpen: true,
    children: (
      <>
        <div className="flex-grow">
          <ToastTitle>Success Toast</ToastTitle>
          <ToastDescription>Your action was successful.</ToastDescription>
          <ToastClose />
        </div>
      </>
    ),
  },
};

export const WithActionAndClose: Story = {
  args: {
    variant: ToastVariants.Default,
    defaultOpen: true,
    children: (
      <>
        <div className="flex-grow">
          <ToastTitle>Action & Close</ToastTitle>
          <ToastDescription>An action and close button.</ToastDescription>
        </div>
        <ToastAction altText="action">Action</ToastAction>
        <ToastClose />
      </>
    ),
  },
};