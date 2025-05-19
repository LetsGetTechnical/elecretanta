import { render, screen } from '@testing-library/react';
import { CommandEmpty } from './CommandEmpty';
import { Command } from './Command';

describe('CommandEmpty', () => {
    it('renders the component when there are no matching items', () => {
        render(
        <Command>
            <CommandEmpty/>
        </Command>);

        const commandEmpty = screen.getByTestId('command-empty');
        expect(commandEmpty).toBeInTheDocument();
    });

    it('renders the children content within CommandEmpty', () => {
        render(
        <Command>
            <CommandEmpty>
                children
            </CommandEmpty>
        </Command>)
        
        const commandEmpty = screen.getByTestId('command-empty');
        expect(commandEmpty).toHaveTextContent('children');
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