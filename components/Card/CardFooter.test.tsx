import { render, screen } from '@testing-library/react';
import { CardFooter } from './CardFooter'; 

describe('CardFooter', () => {
    it('renders the component', () => {
        render(<CardFooter />);

        const cardFooter = screen.getByTestId('card-footer');
        expect(cardFooter).toBeInTheDocument();
    });

    it('renders the children content within CardFooter', () => {
        render(<CardFooter>children</CardFooter>);

        const cardFooter = screen.getByTestId('card-footer');
        expect(cardFooter).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<CardFooter className="custom-class"/>);

        const cardFooter = screen.getByTestId('card-footer');
        expect(cardFooter).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CardFooter aria-label="Elfgorithm footer"/>);

        const cardFooter = screen.getByTestId('card-footer');
        expect(cardFooter).toHaveAttribute('aria-label', 'Elfgorithm footer');
    })
})