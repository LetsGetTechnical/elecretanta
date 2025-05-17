import { render, screen } from '@testing-library/react';
import { CommandGroup } from './Command';
import { Command } from './Command';
import React from 'react';

describe('CommandGroup', () => {
    it('renders the component', () => {
        render(
        <Command>
            <CommandGroup/>
        </Command>)

        const commandGroup = screen.getByTestId('command-group');
        expect(commandGroup).toBeInTheDocument();
    });

    it('renders the children content within CommandGroup', () => {
        render(
        <Command>
            <CommandGroup>children</CommandGroup>
        </Command>
        );

        const commandGroup = screen.getByTestId('command-group');
        expect(commandGroup).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(
        <Command>
            <CommandGroup className="custom-class"/>
        </Command>  
        );

        const commandGroup = screen.getByTestId('command-group');
        expect(commandGroup).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
            <CommandGroup aria-label='Elfgorithm price ranges'/>
        </Command> );

        const commandGroup = screen.getByTestId('command-group');
        expect(commandGroup).toHaveAttribute('aria-label', 'Elfgorithm price ranges');
    });
})