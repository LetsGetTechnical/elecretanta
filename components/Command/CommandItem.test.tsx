import { render, screen } from '@testing-library/react';
import { CommandItem } from './CommandItem';
import { Command } from './Command';

describe('CommandItem', () => {
    it('renders the component', () => {
        render(
            <Command>
                <CommandItem/>
            </Command>
        );

        const commandItem = screen.getByTestId('command-item');
        expect(commandItem).toBeInTheDocument();
    });

    it('renders the children content within CommandItem', () => {
        render(
            <Command>
                <CommandItem>children</CommandItem>
            </Command>
        );

        const commandItem = screen.getByTestId('command-item');
        expect(commandItem).toHaveTextContent('children')
    });

    it('applies a custom className passed via props', () => {
        render(
            <Command>
                <CommandItem className="custom-class"/>
            </Command>
        );

        const commandItem = screen.getByTestId('command-item');
        expect(commandItem).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
            <CommandItem aria-label="Select budget range"/>
        </Command>);

        const commandItem = screen.getByTestId('command-item');
        expect(commandItem).toHaveAttribute('aria-label', 'Select budget range')
    })
})