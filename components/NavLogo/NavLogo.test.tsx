// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import NavLogo from './NavLogo';
import { render, screen } from '@testing-library/react';

describe('NavLogo', () => {
  it('renders the logo and links to the dashboard', () => {
    render(<NavLogo />);

    const navLogoIcon = screen.getByTestId('nav-logo-icon');
    expect(navLogoIcon).toBeInTheDocument();

    const navLogoLink = screen.getByTestId('nav-logo-link');
    expect(navLogoLink).toHaveAttribute('href', '/dashboard');
  });
});
