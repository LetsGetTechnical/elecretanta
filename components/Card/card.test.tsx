// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Card, CardHeader } from './card'; 
import React from 'react';

describe ('Card is rendered with basic styling', () => {
    it('renders Card with default styles', () => {
        render(<Card data-testid="card">Card Content</Card>);
                
        const card = screen.getByTestId('card');
                
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass('rounded-xl', 'border', 'bg-card', 'text-card-foreground', 'shadow');
        });

    it('renders a child component', () => {
        render(
            <Card data-testid="card">
                <CardHeader data-testid="header">Header Text</CardHeader>
            </Card>
        );

        const card = screen.getByTestId('card');
        const header = screen.getByTestId('header');
        expect(header).toBeInTheDocument();
        expect(card).toContainElement(header);
    })
})

describe('Card - prop forwarding', () => {
    it('forwards className to the DOM element (div)', () => {
        render(
            <Card data-testid="card" className="customClass">Card Content</Card>
        );

        const card = screen.getByTestId('card');
        expect(card).toHaveClass('customClass')
    })
})

describe('Card - forward Ref', () => {
    it('forwards ref to the DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<Card ref={ref}>Ref Test</Card>);
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement); 
        expect(ref.current).toBeInTheDocument();
    })
})