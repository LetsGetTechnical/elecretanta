import { fireEvent, render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';
import React from 'react';

describe('Dialog', () => {
  it('should render correctly with content when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent data-testid="dialog-content">Content</DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });

  it('should not render the content when closed', () => {
    render(
      <Dialog open={false}>
        <DialogContent data-testid="dialog-content">Content</DialogContent>
      </Dialog>,
    );

    expect(screen.queryByTestId('dialog-content')).toBeNull();
  });

  it('should close the dialog if the Escape key is pressed', () => {
    render(
      <Dialog open={true}>
        <DialogContent data-testid="dialog-content">Content</DialogContent>
      </Dialog>,
    );
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

    fireEvent.keyDown(window, {
      key: 'Escape',
      code: 'Escape',
    });

    expect(screen.queryByTestId('dialog-content')).toBeNull();
  });

  describe('DialogTrigger', () => {
    it('should render the trigger', () => {
      render(
        <Dialog open={false}>
          <DialogTrigger data-testid="dialog-trigger">Trigger</DialogTrigger>
        </Dialog>,
      );

      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
    });

    it('should render the content when the trigger is clicked', () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="dialog-trigger">Trigger</DialogTrigger>
          <DialogContent data-testid="dialog-content">Content</DialogContent>
        </Dialog>,
      );

      expect(screen.queryByTestId('dialog-content')).toBeNull();

      fireEvent.click(screen.getByTestId('dialog-trigger'));

      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });
  });

  describe('DialogContent', () => {
    it('should render correctly with children', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader data-testid="dialog-header">
              <DialogTitle data-testid="dialog-title">Title</DialogTitle>
              <DialogDescription data-testid="dialog-description">
                Description
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>,
      );

      expect(screen.getByTestId('dialog-header')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-description')).toBeInTheDocument();
    });
  });

  describe('DialogClose', () => {
    it('should render the close button', () => {
      render(
        <Dialog open={true}>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
        </Dialog>,
      );

      expect(screen.getByTestId('dialog-close')).toBeInTheDocument();
    });

    it('should close the dialog when the close button is clicked', () => {
      render(
        <Dialog open={true}>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
        </Dialog>,
      );

      fireEvent.click(screen.getByTestId('dialog-close'));

      expect(screen.queryByTestId('dialog-content')).toBeNull();
    });
  });
});
