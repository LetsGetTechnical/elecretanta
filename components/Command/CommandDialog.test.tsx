import { render, screen } from '@testing-library/react';
import { CommandDialog } from './CommandDialog';
import { DialogTitle, DialogDescription } from '../Dialogue/dialog';

describe('CommandDialog', () => {
    it('renders the component when open', () => {
        render(
        <CommandDialog open={true}>
            <DialogTitle/>
            <DialogDescription/>
        </CommandDialog>
        );

        expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
    });

    it('does not render the component when closed', () => {
        render(
            <CommandDialog open={false}/>
            );

            expect(screen.queryByTestId('command-dialog')).toBeNull();
    });

    it('renders children content within CommandDialog', () => {
        render(
        <CommandDialog open={true}>
            <DialogTitle/>
            <DialogDescription/>
            <div>children</div>
        </CommandDialog>
        );

        expect(screen.getByTestId('command-dialog')).toHaveTextContent('children');
    });
})