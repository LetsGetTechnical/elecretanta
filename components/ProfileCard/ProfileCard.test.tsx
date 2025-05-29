// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';
import { Profile } from '@/app/types/profile';
import { userEvent } from '@testing-library/user-event';

jest.mock('@radix-ui/react-avatar', () => {
  const actual = jest.requireActual('@radix-ui/react-avatar');
  return {
    ...actual,
    Image: ({ src, alt, ...props }: { src?: string; alt?: string }) => {
      if (!src) {
        return (
          <img
            data-testid="avatar-fallback-image"
            src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
            alt="default avatar"
            {...props}
          />
        );
      }
      return <img data-testid="avatar-image" src={src} alt={alt} {...props} />;
    },
  };
});

const testProfile: Profile = {
  id: '3',
  display_name: 'will cooley',
  email: 'will@aol.com',
  age_group: '65+',
  avatar:
    'https://unsplash.com/photos/a-man-wearing-glasses-and-a-black-shirt-iEEBWgY_6lA',
  categories: ['Music & Sound', 'Tech & Gadgets', 'Food & Cooking'],
  hobbies: 'unit testing',
  avoid: 'spiders',
  practical_whimsical: 70,
  cozy_adventurous: 40,
  minimal_luxurious: 90,
  created_at: 'jan 1 2025',
  updated_at: 'jan 2 2025',
  onboarding_complete: true,
};

const emptyProfile = null;

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

describe('ProfileCard', () => {
  describe('Renders the ProfileCard component with props when profile is present', () => {
    beforeEach(() => {
      render(<ProfileCard profile={testProfile} showEditButton={false} />);
    });
    it('Renders with profileName, avatar, age_group, hobbies, and avoid properties', () => {
      const profileName = screen.getByTestId('profileName');
      const avatarImage = screen.getByTestId('avatar-image');
      const ageGroup = screen.getByTestId('ageGroup');
      const hobbies = screen.getByTestId('hobbies');
      const avoid = screen.getByTestId('avoid');
      expect(profileName).toHaveTextContent('Will Cooley');
      expect(avatarImage).toHaveAttribute(
        'src',
        'https://unsplash.com/photos/a-man-wearing-glasses-and-a-black-shirt-iEEBWgY_6lA',
      );
      expect(ageGroup).toHaveTextContent('65+');
      expect(hobbies).toHaveTextContent('unit testing');
      expect(avoid).toHaveTextContent('spiders');
    });
  });

  it('Renders the ProfileCard component with "No Name Provided" if profile has no name', () => {
    render(<ProfileCard profile={emptyProfile} showEditButton={false} />);
    const profileName = screen.getByTestId('profileName');
    expect(profileName).toHaveTextContent('No Name Provided');
  });

  it('Renders the ProfileCard with the Avatar Fallback if the testProfile image is undefined', () => {
    render(
      <ProfileCard
        profile={{ ...testProfile, avatar: undefined }}
        showEditButton={false}
      />,
    );
    const avatarFallbackImage = screen.getByTestId('avatar-fallback-image')
    expect(avatarFallbackImage).toHaveAttribute(
      'src',
      'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg',
    );
  });

  it('Edit Profile Button navigates to the onboarding path after user click', async () => {
    render(<ProfileCard profile={testProfile} showEditButton={true} />);
    const editProfileButton = screen.getByTestId('editProfileButton');
    await userEvent.click(editProfileButton);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/onboarding?editing=true');
  });

  it('Renders a Badge for each category', () => {
    render(
      <ProfileCard
        profile={{ ...testProfile, practical_whimsical: undefined }}
        showEditButton={true}
      />,
    );
    const categoryBadges = screen.getByTestId('categoryBadges');
    expect(categoryBadges).toHaveTextContent(testProfile.categories[0]);
    expect(categoryBadges).toHaveTextContent(testProfile.categories[1]);
    expect(categoryBadges).toHaveTextContent(testProfile.categories[2]);
  });

  it('Renders the preferenceRight, preferenceLeft labels when value is undefined', () => {
    render(
      <ProfileCard
        profile={{ ...testProfile, practical_whimsical: 0 }}
        showEditButton={false}
      />,
    );
    const preferenceLeftNoValue = screen.getByTestId(
      'practicalWhimsical-left-no-value',
    );
    const preferenceRightNoValue = screen.getByTestId(
      'practicalWhimsical-right-no-value',
    );
    expect(preferenceLeftNoValue).toHaveTextContent('Practical');
    expect(preferenceRightNoValue).toHaveTextContent('Whimsical');
  });

  describe('Preference rendering in Progress Component', () => {
    beforeEach(() => {
      render(
        <ProfileCard profile={{ ...testProfile }} showEditButton={false} />,
      );
    });

    it('Renders the Practical-Whimsical value', () => {
      const preferenceLeft = screen.getByTestId('practicalWhimsical-left');
      const preferenceRight = screen.getByTestId('practicalWhimsical-right');
      const progress = screen.getByTestId('practicalWhimsical-progress');
      expect(preferenceLeft).toHaveTextContent('Practical');
      expect(preferenceRight).toHaveTextContent('Whimsical');
      expect(progress).toHaveAttribute('data-value', '70');
    });

    it('Renders the Cozy-Adventerous value', () => {
      const preferenceLeft = screen.getByTestId('cozyAdventurous-left');
      const preferenceRight = screen.getByTestId('cozyAdventurous-right');
      const progress = screen.getByTestId('cozyAdventurous-progress');
      expect(preferenceLeft).toHaveTextContent('Cozy');
      expect(preferenceRight).toHaveTextContent('Adventurous');
      expect(progress).toHaveAttribute('data-value', '40');
    });

    it('Renders the Luxurious-Minimal value', () => {
      const preferenceLeft = screen.getByTestId('minimalLuxurious-left');
      const preferenceRight = screen.getByTestId('minimalLuxurious-right');
      const progress = screen.getByTestId('minimalLuxurious-progress');
      expect(preferenceLeft).toHaveTextContent('Minimal');
      expect(preferenceRight).toHaveTextContent('Luxurious');
      expect(progress).toHaveAttribute('data-value', '90');
    });
  });
});
