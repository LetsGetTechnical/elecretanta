import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Command, CommandInput } from './Command';
import { useState } from 'react';

describe('CommandInput', () => {
    it('displays input field inside Command container', () => {
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

    it('updates the input value when a user types', async() => {
        const user = userEvent.setup();
        render(
            <Command>
                <CommandInput placeholder="placeholder text"/>
            </Command>
        );

        const input = screen.getByPlaceholderText('placeholder text')
        await user.type(input, 'User entered text');

        expect(input).toHaveValue('User entered text')
    });
    
    it('clears the input when user deletes typed text', async () => {
      const user = userEvent.setup();
    
      render(
        <Command>
            <CommandInput placeholder="search..."/>
        </Command>
      );

      const input = screen.getByPlaceholderText('search...');
      await user.type(input, 'user text');
      expect(input).toHaveValue('user text');

      await user.clear(input);
      expect(input).toHaveValue('');
    });
    
      
})