// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardHeader, CardTitle } from './card'; 
import React from 'react';

describe('renders heading with default styling', () => {
    it('renders CardHeader with default styling', () => {
        render(<CardHeader data-testid="card-header">Card Header Content</CardHeader>)

        const cardHeader = screen.getByTestId('card-header')

        expect(cardHeader).toBeInTheDocument();
        expect(cardHeader).toHaveClass('flex', 'flex-col', 'space-y-1.5 p-6');
    })

    it('renders child component (e.g. CardTitle)', () => {
        render(
            <CardHeader data-testid="card-header">
                <CardTitle data-testid="card-title"></CardTitle>
            </CardHeader>
        );

        const cardHeader = screen.getByTestId('card-header');
        const cardTitle = screen.getByTestId('card-title');
        expect(cardTitle).toBeInTheDocument();
        expect(cardHeader).toContainElement(cardTitle);
    } )
})

describe('CardHeader - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardHeader data-testid="card-header" className="custom-class">Header Content</CardHeader>);

        const cardHeader = screen.getByTestId('card-header');
        expect(cardHeader).toHaveClass('custom-class')
        expect(cardHeader).toHaveClass('flex', 'flex-col', 'space-y-1.5 p-6')
    })
})

describe('CardHeader - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<CardHeader ref={ref}>Ref test</CardHeader>);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBeInTheDocument();
    })
})