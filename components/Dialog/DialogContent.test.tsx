// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { DialogContent } from './DialogContent';
import { Dialog } from './Dialog';
import { DialogTitle } from './DialogTitle';

describe('DialogContent', () => {
  it('should render with default props', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          Test content
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toHaveTextContent(
      'Dialog TitleTest content',
    );
    expect(screen.getByTestId('dialog-close-button')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent className="custom-class" aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          Test content
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toHaveClass('custom-class');
  });

  it('should apply additional props to the content element', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent
          aria-label="Dialog content"
          data-custom="custom-value"
          aria-describedby={undefined}
        >
          <DialogTitle>Dialog Title</DialogTitle>
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
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Dialog Title</DialogTitle>
          Test content
        </DialogContent>
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
