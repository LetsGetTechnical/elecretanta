import { render, screen } from '@testing-library/react';
import { CardHeader, CardTitle } from './card'; 
import React from 'react';

describe('renders heading with default styling', () => {
    it('renders CardHeader with default styling', () => {
        render(<CardHeader data-testid="card-header">Card Header Content</CardHeader>)

        const cardHeader = screen.getByTestId('card-header')

        // Did CardHeader render?
        expect(cardHeader).toBeInTheDocument();
        // Is default styling present?
        expect(cardHeader).toHaveClass('flex', 'flex-col', 'space-y-1.5 p-6')
    })

    it('renders child component (e.g. CardTitle)', () => {
        render(
            <CardHeader data-testid="header">
                <CardTitle data-testid="title"></CardTitle>
            </CardHeader>
        );

        // Are both components rendered? 
        const header = screen.getByTestId('header');
        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
        expect(header).toContainElement(title);
    } )
})

describe('CardHeader - prop forwarding', () => {
    it('applies additional className in addition to default styles', () => {
        render(<CardHeader data-testid="card-header" className="custom-class">Header Content</CardHeader>);

        const cardHeader = screen.getByTestId('card-header');
        // Was custom class forwarded? 
        expect(cardHeader).toHaveClass('custom-class')
        // Are default styles still present? 
        expect(cardHeader).toHaveClass('flex', 'flex-col', 'space-y-1.5 p-6')
    })
})

describe('CardHeader - forward Ref', () => {
    it('forwards ref to DOM element (div)', () => {
        const ref = React.createRef<HTMLDivElement>();

        // Render CardHeader component with ref
        render(<CardHeader ref={ref}>Ref test</CardHeader>);

        // Is ref assigned to div element? 
        expect(ref.current).toBeInstanceOf(HTMLDivElement);

        // Is the div in the document?
        expect(ref.current).toBeInTheDocument();
    })
})