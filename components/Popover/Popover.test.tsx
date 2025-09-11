// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Popover } from './popover';

describe('Popover', () => {
    it('renders the popover element', () => {
        render(
            <Popover>
                <p>Hello</p>
            </Popover>);
        screen.debug()

        // const navLogoIcon = screen.getByTestId('nav-logo-icon');
        // expect(navLogoIcon).toBeInTheDocument();
        
        // const navLogoText = screen.getByTestId('nav-logo-text');
        // expect(navLogoText).toHaveTextContent('Elfgorithm');

        // const navLogoLink = screen.getByTestId('nav-logo-link');
        // expect(navLogoLink).toHaveAttribute('href', '/dashboard')
    });
})

//Testing if the popover opens(displays content), closes(hide content),