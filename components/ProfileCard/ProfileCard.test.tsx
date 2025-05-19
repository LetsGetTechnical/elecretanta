// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';
import { Profile } from '@/app/types/profile';

const mockProfile: Profile = {
  id: "2",
  display_name:"'Will Cooley",
  email: "will@aol.com",
  age_group: "65+",
  avatar: "will.jpg",
  categories: ["Music & Sound", "Tech & Gadgets"],
  hobbies: "unit testing",
  avoid: "spiders",
  practical_whimsical: 3,
  cozy_adventurous: 3,
  minimal_luxurious: 4,
  created_at: "jan 1 2025",
  updated_at: "jan 2 2025",
  onboarding_complete: true,
};

jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

describe('ProfileCard', () => {
  it('Renders the ProfileCard component with users name', () => {
    render(<ProfileCard profile={mockProfile} showEditButton={false} />);
    const profileName = screen.getByTestId('profileName');
    expect(profileName).toHaveTextContent('Will Cooley');
  });

});
