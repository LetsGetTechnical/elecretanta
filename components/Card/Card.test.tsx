import { render, screen } from '@testing-library/react';
import { Card } from './Card'; 

describe ('Card', () => {
    it('renders the component', () => {
        render(<Card />);
                
        const card = screen.getByTestId('card');
        expect(card).toBeInTheDocument();
    });

    it('renders the children content within Card', () => {
        render(<Card>children</Card>);

        const card = screen.getByTestId('card');
        expect(card).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<Card className="custom-class"/>);

        const card = screen.getByTestId('card');
        expect(card).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<Card aria-label="Secret Santa Exchange card"/>);

        const card = screen.getByTestId('card');
        expect(card).toHaveAttribute('aria-label', 'Secret Santa Exchange card')
    });
})