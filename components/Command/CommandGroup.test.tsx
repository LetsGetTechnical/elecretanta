import { render, screen } from '@testing-library/react';
import { Command, CommandGroup, CommandList } from './Command';

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe('CommandGroup', () => {
    it('renders the component within CommandList wrapper', () => {
        render(
        <Command>
            <CommandList>
                <CommandGroup/>
            </CommandList>
        </Command>)

        expect(screen.getByTestId('command-group')).toBeInTheDocument();
    });

    it('renders the children content within CommandGroup', () => {
        render(
        <Command>
            <CommandGroup>children</CommandGroup>
        </Command>
        );

        expect(screen.getByTestId('command-group')).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(
        <Command>
            <CommandGroup className="custom-class"/>
        </Command>  
        );

        expect(screen.getByTestId('command-group')).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(
        <Command>
            <CommandGroup aria-label='Secret Santa Exchange price ranges'/>
        </Command> );

        expect(screen.getByTestId('command-group')).toHaveAttribute('aria-label', 'Secret Santa Exchange price ranges');
    });
})