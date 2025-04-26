// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardDescription } from './card'; 
import React from 'react';

describe('CardDescription', () => {

    it('renders CardDescription with default styling', () => {
        render(<CardDescription data-testid="card-description"></CardDescription>); 

        const cardDescription = screen.getByTestId('card-description'); 

        // Did CardDescription render? 
        expect(cardDescription).toBeInTheDocument();
        // Is the default styling present? 
        expect(cardDescription).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('renders provided children', () => {
        render(<CardDescription>description text</CardDescription>);

        const cardDescription = screen.getByText('description text'); 
        expect(cardDescription).toHaveTextContent('description text')
    })
})

describe('CardDescription - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardDescription data-testid="card-description" className="custom-class"></CardDescription>);
        
        const cardDescription = screen.getByTestId('card-description');
        // Was custom class forwarded? 
        expect(cardDescription).toHaveClass('custom-class');
        // Are default styles still present? 
        expect(cardDescription).toHaveClass('text-sm', 'text-muted-foreground')
    })
})

describe('CardDescription - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        // Render CardDescription component with ref
        render(<CardDescription ref={ref}>Ref test</CardDescription>);

        // Is ref assigned to div element? 
        expect(ref.current).toBeInstanceOf(HTMLDivElement);

        // Is the div in the document?
        expect(ref.current).toBeInTheDocument();
    })
})