// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardContent } from './card'; 
import React from 'react';

describe('CardContent', () => {
    it('renders CardContent with default styling', () => {
        render(<CardContent data-testid="card-content"></CardContent>);

        const cardContent = screen.getByTestId('card-content');

        expect(cardContent).toBeInTheDocument(); 
        expect(cardContent).toHaveClass('p-6', 'pt-0');
    });

    it('renders provided children', () => {
        render(<CardContent data-testid="card-content">
            <div data-testid="content-element"></div>
        </CardContent>);

        const cardContent = screen.getByTestId('card-content');
        const contentElement = screen.getByTestId('content-element');
        
        expect(contentElement).toBeInTheDocument();
        expect(cardContent).toContainElement(contentElement);
    })
})

describe('CardContent - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardContent data-testid="card-content" className="custom-class"></CardContent>);

        const cardContent = screen.getByTestId('card-content');
        expect(cardContent).toHaveClass('custom-class');
        expect(cardContent).toHaveClass('p-6', 'pt-0');
    })
})

describe('CardContent - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<CardContent ref={ref}>Ref test</CardContent>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBeInTheDocument();
    })
})