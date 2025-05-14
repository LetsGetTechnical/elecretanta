import { render, screen } from '@testing-library/react';
import { CommandSeparator } from './CommandSeparator';
import { Command } from './command';
import React from 'react';

describe('CommandSeparator', () => {
    it('renders the component', () => {
        render(
            <Command>
                <CommandSeparator/>
            </Command>
        );

        const commandSeparator = screen.getByTestId('command-separator');
        expect(commandSeparator).toBeInTheDocument();
    });

    it('applies a custom className passed via props', () => {
        render(
            <Command>
                <CommandSeparator className="custom-class"/>
            </Command>
        );

        const commandSeparator = screen.getByTestId('command-separator');
        expect(commandSeparator).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as role, passed via props', () => {
        render(
            <Command>
                <CommandSeparator role="separator"/>
            </Command>
        );

        const commandSeparator = screen.getByTestId('command-separator');
        expect(commandSeparator).toHaveAttribute('role', 'separator');
    });
})