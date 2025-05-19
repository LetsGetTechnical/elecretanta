import { render, screen } from '@testing-library/react';
import { CommandList } from './CommandList';
import { Command } from './Command';

describe('CommandList', () => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
 
    it('renders the component', () => {
        render(
            <Command>
                <CommandList/>
            </Command>
        );

        const commandList = screen.getByTestId('command-list');
        expect(commandList).toBeInTheDocument();
    });

    it('renders the children content within CommandList', () => {
        render(
            <Command>
                <CommandList>children</CommandList>
            </Command>
        );

        const commandList = screen.getByTestId('command-list');
        expect(commandList).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(
            <Command>
                <CommandList className="custom-class"/>
            </Command>
        );

        const commandList = screen.getByTestId('command-list');
        expect(commandList).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
            <Command aria-label="Suggestions">
                <CommandList/>
            </Command>
        );

        const commandList = screen.getByTestId('command-list');
        expect(commandList).toHaveAttribute('aria-label', 'Suggestions');
    });
})