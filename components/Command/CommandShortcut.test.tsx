import { render, screen } from '@testing-library/react';
import { CommandShortcut } from './CommandShortcut';

describe('CommandShortcut', () => {
    it('renders the component', () => {
        render(<CommandShortcut/>);

        expect(screen.getByTestId('command-shortcut')).toBeInTheDocument();
    });

    it('renders keyboard shortcut text', () => {
        render(<CommandShortcut>⌘K</CommandShortcut>);

        expect(screen.getByTestId('command-shortcut')).toHaveTextContent('⌘K');
    });

    it('applies a custom className passed via props', () => {
        render(<CommandShortcut className="custom-class"/>);

       expect(screen.getByTestId('command-shortcut')).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CommandShortcut aria-label="shortcut"/>);

        expect(screen.getByTestId('command-shortcut')).toHaveAttribute('aria-label', 'shortcut');
    });
})