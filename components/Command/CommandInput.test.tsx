import { render, screen } from '@testing-library/react';
import { CommandInput } from './CommandInput';
import { Command } from './Command';

describe('CommandInput', () => {
    it('renders the component', () => {
        render(
            <Command>
                <CommandInput/>
            </Command>
        );

        const commandInput = screen.getByTestId('command-input');
        expect(commandInput).toBeInTheDocument();
    });

    it('renders the value within CommandInput', () => {
        render(
            <Command>
                <CommandInput value="children"/>
            </Command>
        );

        const commandInput = screen.getByTestId('command-input').querySelector('input');
        expect(commandInput).toHaveValue('children')
    });

    it('renders the placeholder text within CommandInput', () => {
        render(
            <Command>
                <CommandInput placeholder="Search Price Ranges..."/>
            </Command>
        );

        const commandInput = screen.getByTestId('command-input').querySelector('input');
        expect(commandInput).toHaveAttribute('placeholder', 'Search Price Ranges...'); 
    });

    it('applies a custom className passed via props', () => {
        render(
            <Command>
                <CommandInput className="custom-class"/>
            </Command>
        );

        const commandInput = screen.getByTestId('command-input').querySelector('input');
        expect(commandInput).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
            <CommandInput aria-label="Search commands"/>
        </Command>    
        );

        const commandInput = screen.getByTestId('command-input').querySelector('input');
        expect(commandInput).toHaveAttribute('aria-label', 'Search commands');
    });
})