import { render, screen } from '@testing-library/react';
import { CardTitle } from './CardTitle'; 
import React from 'react';

describe('CardTitle', () => {
    it('renders the component', () => {
        render(<CardTitle />);

        const cardTitle = screen.getByTestId('card-title');
        expect(cardTitle).toBeInTheDocument();
    });

    it('renders the children content within CardTitle', () => {
        render(<CardTitle>children</CardTitle>);

        const cardTitle = screen.getByTestId('card-title');
        expect(cardTitle).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<CardTitle className="custom-class"/>);

        const cardTitle = screen.getByTestId('card-title');
        expect(cardTitle).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CardTitle aria-label="Elfgorithm features"/>);

        const cardTitle = screen.getByTestId('card-title');
        expect(cardTitle).toHaveAttribute('aria-label', 'Elfgorithm features');
    });
})