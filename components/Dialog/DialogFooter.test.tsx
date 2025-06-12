// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogFooter } from './DialogFooter';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';

describe('DialogFooter', () => {
  it('should render with default props', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogFooter>Dialog Footer</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogFooter className="custom-footer-class">
            Dialog Footer
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toHaveClass('custom-footer-class');
    expect(footer).toHaveClass(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    );
  });

  it('should render children correctly', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogFooter>
            <button>Cancel</button>
            <button>Submit</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toHaveTextContent('CancelSubmit');
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should apply additional props to the footer element', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogFooter aria-label="Dialog footer" role="group">
            Dialog Footer
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toHaveAttribute('aria-label', 'Dialog footer');
    expect(footer).toHaveAttribute('role', 'group');
  });
});
