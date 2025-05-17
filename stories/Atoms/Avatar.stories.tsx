import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Avatar from '../../components/Avatar/Avatar';

export default {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Avatar component used to display user profile images with fallback options.',
      },
    },
  },
} as Meta;

const Template: StoryFn<{ userAvatar: string | undefined }> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  userAvatar: undefined,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Displays the default avatar fallback image when no user avatar is provided.',
    },
  },
};

export const WithUserAvatar = Template.bind({});
WithUserAvatar.args = {
  userAvatar: 'https://example.com/user-avatar.jpg',
};
WithUserAvatar.parameters = {
  docs: {
    description: {
      story: 'Displays the user avatar image when a valid URL is provided.',
    },
  },
};

export const WithFallbackAvatar = Template.bind({});
WithFallbackAvatar.args = {
  userAvatar: undefined,
};
WithFallbackAvatar.parameters = {
  docs: {
    description: {
      story: 'Explicitly shows the fallback avatar image.',
    },
  },
};
