// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardContent } from './CardContent'; 
import React from 'react';

describe('CardContent', () => {
    it('renders the component', () => {
        render(<CardContent />);

        const cardContent = screen.getByTestId('card-content');
        expect(cardContent).toBeInTheDocument(); 
    });

    it('renders the children content within CardContent', () => {
        render(<CardContent>children</CardContent>);

        const cardContent = screen.getByTestId('card-content');
        expect(cardContent).toHaveTextContent('children');
    })

    it('applies a custom className passed via props', () => {
        render(<CardContent className="custom-class"/>);

        const cardContent = screen.getByTestId('card-content');
        expect(cardContent).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CardContent aria-label="Elfgorithm features"/>);

        const cardContent = screen.getByTestId('card-content');
        expect(cardContent).toHaveAttribute('aria-label', 'Elfgorithm features')
    })
})