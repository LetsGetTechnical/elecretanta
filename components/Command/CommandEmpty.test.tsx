import { render, screen } from '@testing-library/react';
// import { CommandEmpty } from './CommandEmpty';
import { Command, CommandEmpty, CommandList, CommandInput, CommandItem } from './Command';
import userEvent from '@testing-library/user-event';

describe('CommandEmpty', () => {

    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    it('renders the component when there are no matching items', async() => {
        render(
        <Command>
            <CommandInput placeholder="Search"/>
            <CommandList>
                <CommandEmpty>No veggies found</CommandEmpty>
            </CommandList>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Blueberries</CommandItem>
        </Command>);

        await userEvent.type(screen.getByPlaceholderText('Search'), 'Kale')

        const commandEmpty = screen.getByTestId('command-empty');
        expect(commandEmpty).toBeInTheDocument();
    });

    it('renders the children content within CommandEmpty', () => {
        render(
        <Command>
            <CommandEmpty>
                No results found
            </CommandEmpty>
        </Command>)
        
        const commandEmpty = screen.getByTestId('command-empty');
        expect(commandEmpty).toHaveTextContent('No results found');
    });

    it('applies a custom className passed via props', () => {
        render(
        <Command>
            <CommandEmpty className="custom-class"/>
        </Command>
        );

        const commandEmpty = screen.getByTestId('command-empty');
        expect(commandEmpty).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
             <CommandEmpty aria-label="No matching results"/>
        </Command>
        );

        const commandEmpty = screen.getByTestId('command-empty');
        expect(commandEmpty).toHaveAttribute('aria-label', 'No matching results')
    });
})