import { render, screen } from '@testing-library/react';
import { Command } from './Command';
import React from 'react';

describe('Command', () => {
    it('renders the component', () => {
        render(<Command/>)

        const command = screen.getByTestId('command');
        expect(command).toBeInTheDocument();
    });
    it('renders the children within Command', () => {
        render(<Command>children</Command>);

        const command = screen.getByTestId('command');
        expect(command).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<Command className="custom-class"/>);

        const command = screen.getByTestId('command');
        expect(command).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<Command aria-label="command container"/>)
    })
})