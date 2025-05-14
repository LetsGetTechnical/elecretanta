// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogHeader } from './DialogHeader';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { DialogTitle } from './DialogTitle';

describe('DialogHeader', () => {
  it('should render with default props', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogHeader>Header Content</DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const header = screen.getByTestId('dialog-header');
    expect(header).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogHeader className="custom-header-class">
            Header Content
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const header = screen.getByTestId('dialog-header');
    expect(header).toHaveClass('custom-header-class');
    expect(header).toHaveClass(
      'flex flex-col space-y-1.5 text-center sm:text-left',
    );
  });

  it('should apply additional props to the header element', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogHeader aria-label="Dialog header" role="heading">
            Header Content
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const header = screen.getByTestId('dialog-header');
    expect(header).toHaveAttribute('aria-label', 'Dialog header');
    expect(header).toHaveAttribute('role', 'heading');
  });

  it('should render children correctly', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogHeader>
            <h2>Title</h2>
            <p>Description</p>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const header = screen.getByTestId('dialog-header');
    expect(header).toHaveTextContent('TitleDescription');
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
