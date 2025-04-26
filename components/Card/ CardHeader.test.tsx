import { render, screen } from '@testing-library/react';
import { CardHeader } from './card'; 
import React from 'react';

describe('renders heading with default styling', () => {
    it('renders CardHeader with default styling', () => {
        render(<CardHeader data-testid="card-header">Card Header Content</CardHeader>)

        const cardHeader = screen.getByTestId('card-header')

        // did CardHeader render?
        expect(cardHeader).toBeInTheDocument();
        // is default styling present?
        expect(cardHeader).toHaveClass('flex', 'flex-col', 'space-y-1.5 p-6')
    })
})

describe('CardHeader - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardHeader data-testid="card-header" className="custom-class">Header Content</CardHeader>);

        const cardHeader = screen.getByTestId('card-header')
    })
})