// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogDescription } from './DialogDescription';
import { Dialog } from './Dialog';

jest.mock('./Dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-root">{children}</div>
  ),
}));

describe('DialogDescription', () => {
  it('should render with default props', () => {
    render(
      <Dialog>
        <DialogDescription>This is a description</DialogDescription>
      </Dialog>,
    );

    const description = screen.getByTestId('dialog-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm text-muted-foreground');
    expect(description).toHaveTextContent('This is a description');
  });

  it('should render with custom className', () => {
    render(
      <Dialog>
        <DialogDescription className="custom-desc-class">
          This is a description
        </DialogDescription>
      </Dialog>,
    );

    const description = screen.getByTestId('dialog-description');
    expect(description).toHaveClass('custom-desc-class');
    expect(description).toHaveClass('text-sm text-muted-foreground');
  });

  it('should apply additional props to the description element', () => {
    render(
      <Dialog>
        <DialogDescription aria-label="Dialog description">
          This is a description
        </DialogDescription>
      </Dialog>,
    );

    const description = screen.getByTestId('dialog-description');
    expect(description).toHaveAttribute('aria-label', 'Dialog description');
  });

  it('should forward ref to the description element', () => {
    const ref = jest.fn();
    render(
      <Dialog>
        <DialogDescription ref={ref}>This is a description</DialogDescription>
      </Dialog>,
    );

    expect(ref).toHaveBeenCalled();
  });
});
