// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDropdownMenu from './UserDropdownMenu';

describe('UserDropdownMenu', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('mock-avatar-url'),
      }),
    ) as jest.Mock;
    user = userEvent.setup();
    render(<UserDropdownMenu />);
  });

  it('displays Avatar on page load', () => {
    expect(screen.getByTestId('avatar-body')).toBeInTheDocument();
  });

  it('does not display dropdown menu contents on page load', () => {
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
  });

  it('opens user dropdown menu when avatar is clicked', async () => {
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.getByTestId('dropdown-menu-content')).toBeInTheDocument();
  });

  it('displays appropriate content when dropdown is open', async () => {
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.getByRole('link')).toHaveTextContent('My profile');
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('allows user to navigate dropdown menu items with keyboard', async () => {
    const trigger = screen.getByTestId('dropdown-menu-trigger');
    trigger.focus();
    await user.keyboard('[Space]');
    expect(screen.getByTestId('my-profile-link')).toHaveFocus();
    await user.keyboard('[ArrowDown]');
    expect(screen.getByTestId('logout-button')).toHaveFocus();
  });

  it('navigates user to /profile page when My profile link is clicked', async () => {
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.getByRole('link')).toHaveAttribute('href', '/profile');
  });

  it('closes the dropdown menu after clicking on an item', async () => {
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    await user.click(screen.getByRole('link', { name: 'My profile' }));
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
  });
});
