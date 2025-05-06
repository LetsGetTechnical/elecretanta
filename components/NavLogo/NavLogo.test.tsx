// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import NavLogo from './NavLogo';
import { render, screen } from '@testing-library/react';

describe('NavLogo', () => {
    it('renders the logo and links to the dashboard', () => {
        render(<NavLogo/>);

        const navLogoIcon = screen.getByTestId('nav-logo');
        expect(navLogoIcon).toBeInTheDocument();
        
        const navLogoText = screen.getByTestId('nav-logo-text');
        expect(navLogoText).toHaveTextContent('Elfgorithm');

        const navLogoLink = screen.getByTestId('nav-logo-link');
        expect(navLogoLink).toHaveAttribute('href', '/dashboard')
    });
})