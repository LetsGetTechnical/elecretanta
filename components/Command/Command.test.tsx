import { render, screen } from '@testing-library/react';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from './Command';

describe('Command', () => {

    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    it('renders complete command structure with relevant subcomponents', () => {
        render(
            <Command>
                <CommandInput/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem/> 
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByTestId('command')).toBeInTheDocument();

        expect(screen.getByTestId('command-input')).toBeInTheDocument();

        expect(screen.getByTestId('command-list')).toBeInTheDocument();

        expect(screen.getByTestId('command-group')).toBeInTheDocument();

        expect(screen.getByTestId('command-item')).toBeInTheDocument();
    })
    
    it('renders the children within Command', () => {
        render(<Command>children</Command>);

        expect(screen.getByTestId('command')).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<Command className="custom-class"/>);

        expect(screen.getByTestId('command')).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<Command aria-label="command container"/>);

        expect(screen.getByTestId('command')).toHaveAttribute('aria-label', 'command container');
    });
})