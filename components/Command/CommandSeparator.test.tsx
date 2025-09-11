import { render, screen } from '@testing-library/react';
import { CommandSeparator } from './CommandSeparator';
import { Command } from './Command';

describe('CommandSeparator', () => {
    it('renders the component', () => {
        render(
            <Command>
                <CommandSeparator/>
            </Command>
        );

        expect(screen.getByTestId('command-separator')).toBeInTheDocument();
    });

    it('applies a custom className passed via props', () => {
        render(
            <Command>
                <CommandSeparator className="custom-class"/>
            </Command>
        );

        expect(screen.getByTestId('command-separator')).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as role, passed via props', () => {
        render(
            <Command>
                <CommandSeparator role="separator"/>
            </Command>
        );

        expect(screen.getByTestId('command-separator')).toHaveAttribute('role', 'separator');
    });
})