// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogOverlay } from './DialogOverlay';
import { Dialog } from './Dialog';

describe('DialogOverlay', () => {
  it('should render with default props', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogOverlay />
      </Dialog>,
    );

    const overlay = screen.getByTestId('dialog-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    );
  });

  it('should render with custom className', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogOverlay className="custom-overlay-class" />
      </Dialog>,
    );

    const overlay = screen.getByTestId('dialog-overlay');
    expect(overlay).toHaveClass('custom-overlay-class');
    expect(overlay).toHaveClass(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    );
  });

  it('should apply additional props to the overlay element', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogOverlay data-custom="custom-value" aria-label="Dialog overlay" />
      </Dialog>,
    );

    const overlay = screen.getByTestId('dialog-overlay');
    expect(overlay).toHaveAttribute('data-custom', 'custom-value');
    expect(overlay).toHaveAttribute('aria-label', 'Dialog overlay');
  });

  it('should forward ref to the overlay element', () => {
    const ref = jest.fn();
    render(
      <Dialog defaultOpen={true}>
        <DialogOverlay ref={ref} />
      </Dialog>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it('should handle animation states through data attributes', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogOverlay data-state="open" />
      </Dialog>,
    );

    const overlay = screen.getByTestId('dialog-overlay');
    expect(overlay).toHaveAttribute('data-state', 'open');
  });
});
