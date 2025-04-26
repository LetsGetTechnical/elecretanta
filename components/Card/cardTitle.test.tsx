// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardTitle } from './card'; 
import React from 'react';

describe('CardTitle', () => {
    it('renders CardTitle with default styling', () => {
        render(<CardTitle data-testid="card-title"></CardTitle>);

        const cardTitle = screen.getByTestId('card-title');

        // Did CardTitle render?
        expect(cardTitle).toBeInTheDocument();
        // Is the default styling present? 
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
        // Was custom class forwarded? 
        expect(cardTitle).toHaveClass('custom-class');
        // Are default styles still present? 
        expect(cardTitle).toHaveClass('font-semibold', 'leading-none', 'tracking-tight');
    })
})

describe('CardTitle - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        // Render CardTitle component with ref
        render(<CardTitle ref={ref}>Ref test</CardTitle>);

        // Is ref assigned to div element? 
        expect(ref.current).toBeInstanceOf(HTMLDivElement);

        // Is the div in the document?
        expect(ref.current).toBeInTheDocument();
    })
})