// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogFooter } from './DialogFooter';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';

jest.mock('./Dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-root">{children}</div>
  ),
}));

jest.mock('./DialogContent', () => ({
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
}));

describe('DialogFooter', () => {
  it('should render with default props', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogFooter>
            <button>Cancel</button>
            <button>Submit</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogFooter className="custom-footer-class">
            <button>Cancel</button>
            <button>Submit</button>
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

  it('should apply additional props to the footer element', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogFooter aria-label="Dialog footer" role="group">
            <button>Cancel</button>
            <button>Submit</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    expect(footer).toHaveAttribute('aria-label', 'Dialog footer');
    expect(footer).toHaveAttribute('role', 'group');
  });

  it('should render children in the correct order', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogFooter>
            <button data-testid="cancel-btn">Cancel</button>
            <button data-testid="submit-btn">Submit</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const footer = screen.getByTestId('dialog-footer');
    const buttons = footer.querySelectorAll('button');

    // On mobile (default), buttons should be in reverse order (Submit first, then Cancel)
    expect(buttons[0]).toHaveTextContent('Submit');
    expect(buttons[1]).toHaveTextContent('Cancel');
  });
});
