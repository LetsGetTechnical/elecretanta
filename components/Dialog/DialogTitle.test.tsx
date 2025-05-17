// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogTitle } from './DialogTitle';
import { Dialog } from './Dialog';

describe('DialogTitle', () => {
  it('should render with default props', () => {
    render(
      <Dialog>
        <DialogTitle>Dialog Title</DialogTitle>
      </Dialog>,
    );

    const title = screen.getByTestId('dialog-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      'text-lg font-semibold leading-none tracking-tight',
    );
    expect(title).toHaveTextContent('Dialog Title');
  });

  it('should render with custom className', () => {
    render(
      <Dialog>
        <DialogTitle className="custom-title-class">Dialog Title</DialogTitle>
      </Dialog>,
    );

    const title = screen.getByTestId('dialog-title');
    expect(title).toHaveClass('custom-title-class');
    expect(title).toHaveClass(
      'text-lg font-semibold leading-none tracking-tight',
    );
  });

  it('should apply additional props to the title element', () => {
    render(
      <Dialog>
        <DialogTitle aria-label="Dialog title">Dialog Title</DialogTitle>
      </Dialog>,
    );

    const title = screen.getByTestId('dialog-title');
    expect(title).toHaveAttribute('aria-label', 'Dialog title');
  });

  it('should forward ref to the title element', () => {
    const ref = jest.fn();
    render(
      <Dialog>
        <DialogTitle ref={ref}>Dialog Title</DialogTitle>
      </Dialog>,
    );

    expect(ref).toHaveBeenCalled();
  });
});
