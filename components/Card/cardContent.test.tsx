// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardContent } from './card'; 
import React from 'react';

describe('CardContent', () => {
    it('renders CardContent with default styling', () => {
        render(<CardContent data-testid="card-content"></CardContent>);

        const cardContent = screen.getByTestId('card-content');

        // Did CardContent render?
        expect(cardContent).toBeInTheDocument(); 
        // Is the default styling present? 
        expect(cardContent).toHaveClass('p-6', 'pt-0');
    });

    it('renders provided children', () => {
        render(<CardContent data-testid="card-content">
            <div data-testid="content-element"></div>
        </CardContent>);

        // Are CardContent and its child element rendered? 
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
        // Was custom class forwarded?
        expect(cardContent).toHaveClass('custom-class');
        // Are default styles still present? 
        expect(cardContent).toHaveClass('p-6', 'pt-0');
    })
})

describe('CardContent - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        // Render CardContent component with ref
        render(<CardContent ref={ref}>Ref test</CardContent>);

        // Is ref assigned to div element? 
        expect(ref.current).toBeInstanceOf(HTMLDivElement);

        // Is the div in the document?
        expect(ref.current).toBeInTheDocument();
    })
})