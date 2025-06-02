// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDropdownMenu from './UserDropdownMenu';

// dropdown opens when avatar is clicked (trigger)
// dropdown displays appropriate content
// keyboard navigable
// clicking "My profile" takes the user to the profile page
// log out function should be tested in AuthContext integration tests
// dropdown closes on trigger click

describe('UserDropdownMenu', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    render(<UserDropdownMenu />);
  });

  it('test', () => {
    expect(screen.getByText('My profile')).toBeInTheDocument();
  });

  /*   it('opens user dropdown menu when avatar is clicked', async () => {
    await user.click(screen.getByTestId('avatar'));
    expect(screen.getByTestId('dropdown-menu-content')).toBeInTheDocument();
  }); */
});
