import { render, screen } from '@testing-library/react';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from './Command';

describe('Command', () => {

    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    it('renders the component', () => {
        render(<Command/>)

        const command = screen.getByTestId('command');
        expect(command).toBeInTheDocument();
    });
    
    it('renders the children within Command', () => {
        render(<Command>children</Command>);

        const command = screen.getByTestId('command');
        expect(command).toHaveTextContent('children');
    });

    it('applies a custom className passed via props', () => {
        render(<Command className="custom-class"/>);

        const command = screen.getByTestId('command');
        expect(command).toHaveClass('custom-class');
    });

    it('renders a custom attribute, such as aria-label, passed via props', () => {
        render(<Command aria-label="command container"/>);

        const command = screen.getByTestId('command');
        expect(command).toHaveAttribute('aria-label', 'command container')
    });

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

        const command = screen.getByTestId('command');
        expect(command).toBeInTheDocument();

        const input = screen.getByTestId('command-input');
        expect(input).toBeInTheDocument();

        const commandList = screen.getByTestId('command-list');
        expect(commandList).toBeInTheDocument();

        const commandGroup = screen.getByTestId('command-group');
        expect(commandGroup).toBeInTheDocument();

        const commandItem = screen.getByTestId('command-item');
        expect(commandItem).toBeInTheDocument();
    })
})