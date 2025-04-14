import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AlertDialog, AlertDialogTrigger } from './AlertDialgoue';

describe('AlertDialog Component', () => {
  it('renders the AlertDialog trigger button', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
      </AlertDialog>
    );

    // Verify trigger button is rendered
    const triggerButton = screen.getByText('Open Dialog');
    expect(triggerButton).toBeInTheDocument();
  });
});