// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardTitle } from './card'; 
import React from 'react';

describe('CardTitle', () => {
    it('renders CardTitle with default styling', () => {
        render(<CardTitle data-testid="card-title"></CardTitle>);

        const cardTitle = screen.getByTestId('card-title');

        expect(cardTitle).toBeInTheDocument();
        expect(cardTitle).toHaveClass('font-semibold', 'leading-none', 'tracking-tight');
    })

    it('renders provided children', () => {
        render(<CardTitle>title text</CardTitle>);

        const titleText = screen.getByText('title text');
        expect(titleText).toHaveTextContent('title text');
    })
})

describe('CardTitle - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardTitle data-testid="card-title" className="custom-class">Card Title</CardTitle>);
        
        const cardTitle = screen.getByTestId('card-title');
        expect(cardTitle).toHaveClass('custom-class');
        expect(cardTitle).toHaveClass('font-semibold', 'leading-none', 'tracking-tight');
    })
})

describe('CardTitle - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<CardTitle ref={ref}>Ref test</CardTitle>);
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBeInTheDocument();
    })
})