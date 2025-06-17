import { render, screen } from '@testing-library/react';
import { CommandShortcut } from './CommandShortcut';

describe('CommandShortcut', () => {
    it('renders the component', () => {
        render(<CommandShortcut/>);

        const commandShortcut = screen.getByTestId('command-shortcut');
        expect(commandShortcut).toBeInTheDocument();
    });

    it('renders keyboard shortcut text', () => {
        render(<CommandShortcut>⌘K</CommandShortcut>);

        const commandShortcut = screen.getByTestId('command-shortcut');
        expect(commandShortcut).toHaveTextContent('⌘K');
    });

    it('applies a custom className passed via props', () => {
        render(<CommandShortcut className="custom-class"/>);

        const commandShortcut = screen.getByTestId('command-shortcut');
        expect(commandShortcut).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<CommandShortcut aria-label="shortcut"/>);

        const commandShortcut = screen.getByTestId('command-shortcut');
        expect(commandShortcut).toHaveAttribute('aria-label', 'shortcut');
    });
})