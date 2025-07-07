import { render, screen } from '@testing-library/react';
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
                <CommandEmpty>No matching results</CommandEmpty>
            </CommandList>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Blueberries</CommandItem>
        </Command>);

        await userEvent.type(screen.getByPlaceholderText('Search'), 'Kale')

        expect(screen.getByTestId('command-empty')).toBeInTheDocument();
    });

    it('does not render when there are matching items', async() => {
        render(
        <Command>
            <CommandInput placeholder="Search"/>
            <CommandList>
                <CommandEmpty>No matching results</CommandEmpty>
            </CommandList>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Blueberries</CommandItem>
        </Command>);

        await userEvent.type(screen.getByPlaceholderText('Search'), 'Apple')

        expect(screen.queryByTestId('command-empty')).not.toBeInTheDocument();
    });

    it('renders the children content within CommandEmpty', () => {
        render(
        <Command>
            <CommandEmpty>
                No results found
            </CommandEmpty>
        </Command>)
        
        expect(screen.getByTestId('command-empty')).toHaveTextContent('No results found');
    });

    it('applies a custom className passed via props', () => {
        render(
        <Command>
            <CommandEmpty className="custom-class"/>
        </Command>
        );

        expect(screen.getByTestId('command-empty')).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
             <CommandEmpty aria-label="No matching results"/>
        </Command>
        );

        expect(screen.getByTestId('command-empty')).toHaveAttribute('aria-label', 'No matching results');
    });
})