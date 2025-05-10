// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogHeader } from './DialogHeader';
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

describe('DialogHeader', () => {
  it('should render with default props', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <div>Header Content</div>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const header = screen.getByTestId('dialog-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      'flex flex-col space-y-1.5 text-center sm:text-left',
    );
    expect(header).toHaveTextContent('Header Content');
  });

  it('should render with custom className', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogHeader className="custom-header-class">
            <div>Header Content</div>
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
      <Dialog>
        <DialogContent>
          <DialogHeader aria-label="Dialog header" role="heading">
            <div>Header Content</div>
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
      <Dialog>
        <DialogContent>
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
