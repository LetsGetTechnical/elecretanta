import { render, screen } from '@testing-library/react';
import { CardDescription } from './CardDescription'; 

describe('CardDescription', () => {

    it('renders the component', () => {
        render(<CardDescription />); 

        const cardDescription = screen.getByTestId('card-description'); 
        expect(cardDescription).toBeInTheDocument();
    });

    it('renders the children content within CardDescription', () => {
        render(<CardDescription>children</CardDescription>);

        const cardDescription = screen.getByTestId('card-description');
        expect(cardDescription).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<CardDescription className="custom-class"/>);

        const cardDescription = screen.getByTestId('card-description');
        expect(cardDescription).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CardDescription aria-label="Secret Santa Exchange feature description"/>);

        const cardDescription = screen.getByTestId('card-description');
        expect(cardDescription).toHaveAttribute('aria-label', 'Secret Santa Exchange feature description');
    });
})