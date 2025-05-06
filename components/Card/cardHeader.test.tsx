// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardHeader} from './CardHeader'; 
import React from 'react';

describe('CardHeader', () => {
    it('renders the component', () => {
        render(<CardHeader />);

        const cardHeader = screen.getByTestId('card-header');
        expect(cardHeader).toBeInTheDocument();
    });

    it('renders the children content within CardHeader', () => {
        render(<CardHeader>children</CardHeader>);

        const cardHeader = screen.getByTestId('card-header');
        expect(cardHeader).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<CardHeader className="custom-class"/>);

        const cardHeader = screen.getByTestId('card-header');
        expect(cardHeader).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CardHeader aria-label="Elfgorithm feature overview"/>);

        const cardHeader = screen.getByTestId('card-header');
        expect(cardHeader).toHaveAttribute('aria-label', 'Elfgorithm feature overview');
    });
})