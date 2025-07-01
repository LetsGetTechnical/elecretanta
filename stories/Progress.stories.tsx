import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from '../components/Progress/progress';
import { Indicator } from '@radix-ui/react-progress';

const meta: Meta<typeof Progress> = {
  title: 'Progress',
  component: Progress,
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
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Progress {...args} />
    </div>
  ),
};

export const halfway: Story = {
    args: {
      value: 50,
    },
    render: (args) => (
      <div style={{ width: '300px' }}>
        <Progress {...args} />
      </div>
    ),
  };

  export const full: Story = {
    args: {
      value: 100,
    },
    render: (args) => (
      <div style={{ width: '300px' }}>
        <Progress {...args} />
      </div>
    ),
  };
