// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardDescription } from './CardDescription'; 
import React from 'react';

describe('CardDescription', () => {

    it('renders CardDescription with default styling', () => {
        render(<CardDescription data-testid="card-description"></CardDescription>); 

        const cardDescription = screen.getByTestId('card-description'); 

        expect(cardDescription).toBeInTheDocument();
        expect(cardDescription).toHaveClass('text-sm', 'text-muted-foreground')
    })
})

describe('CardDescription - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardDescription data-testid="card-description" className="custom-class"></CardDescription>);
        
        const cardDescription = screen.getByTestId('card-description');
        expect(cardDescription).toHaveClass('custom-class');
        expect(cardDescription).toHaveClass('text-sm', 'text-muted-foreground')
    })
})

describe('CardDescription - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<CardDescription ref={ref}>Ref test</CardDescription>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBeInTheDocument();
    })
})