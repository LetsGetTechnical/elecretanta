// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { CardFooter } from './card'; 
import React from 'react';

describe('CardFooter', () => {
    it('renders CardFooter with default styling', () => {
        render(<CardFooter data-testid="card-footer"></CardFooter>);

        const cardFooter = screen.getByTestId('card-footer');

        expect(cardFooter).toBeInTheDocument();
        expect(cardFooter).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    })

    it('renders provided children', () => {
        render(<CardFooter data-testid="card-footer">
            <button data-testid="footer-button">test button</button>
        </CardFooter>)

        const cardFooter = screen.getByTestId('card-footer');
        const footerButton = screen.getByTestId('footer-button');

        expect(footerButton).toBeInTheDocument();
        expect(cardFooter).toContainElement(footerButton);
    })
})

describe('CardFooter - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardFooter data-testid="card-footer" className="custom-class">Card Title</CardFooter>);

        const cardFooter = screen.getByTestId('card-footer');
        expect(cardFooter).toHaveClass('custom-class');
        expect(cardFooter).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    })
})

describe('CardFooter - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<CardFooter ref={ref}>Ref test</CardFooter>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBeInTheDocument();
    })
})