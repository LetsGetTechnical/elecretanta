import { render, screen } from '@testing-library/react';
import { Command, CommandItem, CommandGroup } from './Command';
import userEvent from '@testing-library/user-event';

describe('CommandItem', () => {
    it('renders the component within CommandGroup wrapper', () => {
        render(
            <Command>
                <CommandGroup>
                    <CommandItem/>
                </CommandGroup>
            </Command>
        );

        expect(screen.getByTestId('command-item')).toBeInTheDocument();
    });

    it('renders the children content within CommandItem', () => {
        render(
            <Command>
                <CommandItem>children</CommandItem>
            </Command>
        );

        expect(screen.getByTestId('command-item')).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(
            <Command>
                <CommandItem className="custom-class"/>
            </Command>
        );

        expect(screen.getByTestId('command-item')).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
            <CommandItem aria-label="Select budget range"/>
        </Command>);

        expect(screen.getByTestId('command-item')).toHaveAttribute('aria-label', 'Select budget range');
    });

    it('calls onSelect when item is selected', async () => {
        const user = userEvent.setup();
        const handleSelect = jest.fn();

        render(
            <Command>
                <CommandItem onSelect={handleSelect}>Satisfied</CommandItem>
            </Command>
        );

        await user.click(screen.getByTestId('command-item'));
        expect(handleSelect).toHaveBeenCalled();
    })
})