import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Avatar from '../../components/Avatar/Avatar';

export default {
  title: 'Organisms/UserProfile',
  component: ProfileCard,
  parameters: {
    docs: {
      description: {
        component: 'UserProfile component that displays user information along with an avatar and additional details.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

const Template: StoryFn<{ profile: { id: string; display_name: string; email: string; categories: string[]; userAvatar: string | undefined; userName: string; userEmail: string; created_at: string; updated_at: string; onboarding_complete: boolean; bio: string; socialLinks: { twitter: string; linkedin: string } } }> = (args) => (
  <div>
    <Avatar userAvatar={args.profile.userAvatar} />
    <ProfileCard profile={args.profile} />
    <div>
      <h3>{args.profile.userName}</h3>
      <p>{args.profile.bio}</p>
      <p>Email: {args.profile.userEmail}</p>
      <p>Twitter: <a href={args.profile.socialLinks.twitter}>{args.profile.socialLinks.twitter}</a></p>
      <p>LinkedIn: <a href={args.profile.socialLinks.linkedin}>{args.profile.socialLinks.linkedin}</a></p>
    </div>
  </div>
);

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
    bio: 'A passionate developer with a love for coding and technology.',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  },
};
DefaultProfile.parameters = {
  docs: {
    description: {
      story: 'Displays the user profile with default avatar, user information, bio, and social media links.',
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
    bio: 'A creative designer with a knack for visual storytelling.',
    socialLinks: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
    },
  },
};
ProfileWithAvatar.parameters = {
  docs: {
    description: {
      story: 'Displays the user profile with a user-provided avatar, user information, bio, and social media links.',
    },
  },
};
