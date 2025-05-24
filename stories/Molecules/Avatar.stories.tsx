import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

export default {
  title: 'Components/Molecules/ProfileCard',
  component: ProfileCard,
  parameters: {
    docs: {
      description: {
        component: 'ProfileCard component that displays user information along with an avatar.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

const Template: StoryFn<{ profile: { id: string; display_name: string; email: string; categories: string[]; userAvatar: string | undefined; userName: string; userEmail: string; created_at: string; updated_at: string; onboarding_complete: boolean } }> = (args) => <ProfileCard {...args} />;

export const DefaultProfile = Template.bind({});
DefaultProfile.args = {
  profile: {
    id: '1',
    display_name: 'John Doe',
    email: 'john.doe@example.com',
    categories: ['Category1', 'Category2'],
    userAvatar: undefined,
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    created_at: '2025-01-01',
    updated_at: '2025-01-02',
    onboarding_complete: true,
  },
};
DefaultProfile.parameters = {
  docs: {
    description: {
      story: 'Displays the user profile with default avatar and user information.',
    },
  },
};

export const ProfileWithAvatar = Template.bind({});
ProfileWithAvatar.args = {
  profile: {
    id: '2',
    display_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    categories: ['Category1', 'Category2'],
    userAvatar: 'https://example.com/user-avatar.jpg',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    created_at: '2025-01-01',
    updated_at: '2025-01-02',
    onboarding_complete: true,
  },
};
ProfileWithAvatar.parameters = {
  docs: {
    description: {
      story: 'Displays the user profile with a user-provided avatar and user information.',
    },
  },
};
