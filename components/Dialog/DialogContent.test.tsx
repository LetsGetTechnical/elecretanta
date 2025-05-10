// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogContent } from './DialogContent';
import { Dialog } from './Dialog';

jest.mock('./Dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-root">{children}</div>
  ),
}));

// Mock the DialogPortal and DialogOverlay components
jest.mock('./DialogPortal', () => ({
  DialogPortal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-portal">{children}</div>
  ),
}));

jest.mock('./DialogOverlay', () => ({
  DialogOverlay: () => <div data-testid="dialog-overlay" />,
}));

// Mock the DialogClose component
jest.mock('./index', () => ({
  DialogPortal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-portal">{children}</div>
  ),
  DialogOverlay: () => <div data-testid="dialog-overlay" />,
  DialogClose: ({
    className,
    children,
    'data-testid': testId,
  }: {
    className: string;
    children: React.ReactNode;
    'data-testid'?: string;
  }) => (
    <button data-testid={testId || 'dialog-close'} className={className}>
      {children}
    </button>
  ),
}));

describe('DialogContent', () => {
  it('should render with default props', () => {
    render(
      <Dialog>
        <DialogContent>Test content</DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-portal')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toHaveTextContent(
      'Test content',
    );
    expect(screen.getByTestId('dialog-close-button')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <Dialog>
        <DialogContent className="custom-class">Test content</DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toHaveClass('custom-class');
  });

  it('should apply additional props to the content element', () => {
    render(
      <Dialog>
        <DialogContent aria-label="Dialog content" data-custom="custom-value">
          Test content
        </DialogContent>
      </Dialog>,
    );

    const content = screen.getByTestId('dialog-content');
    expect(content).toHaveAttribute('aria-label', 'Dialog content');
    expect(content).toHaveAttribute('data-custom', 'custom-value');
  });

  it('should render close button with sr-only text', () => {
    render(
      <Dialog>
        <DialogContent>Test content</DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-close-button')).toBeInTheDocument();
    expect(
      screen.getByTestId('dialog-close-button-sr-only'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('dialog-close-button-sr-only')).toHaveClass(
      'sr-only',
    );
  });
});
