import { render, screen } from '@testing-library/react';
import { CommandDialog } from './CommandDialog';
import React from 'react';

describe('CommandDialog', () => {
    it('renders the component when open', () => {
        render(
        <CommandDialog open={true}/>
        );

        const commandDialog = screen.getByTestId('command-dialog');
        expect(commandDialog).toBeInTheDocument();
    });

    it('does not render the component when closed', () => {
        render(
            <CommandDialog open={false}/>
            );

            const commandDialog = screen.queryByTestId('command-dialog');
            expect(commandDialog).not.toBeInTheDocument();
    });

    it('renders children content within CommandDialog', () => {
        render(<CommandDialog open={true}>children</CommandDialog>);

        const commandDialog = screen.queryByTestId('command-dialog');
        expect(commandDialog).toHaveTextContent('children');
    });
})