import { fireEvent, render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './index';
import userEvent from '@testing-library/user-event';
describe('Dialog', () => {
  it('should render correctly with content when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Title</DialogTitle>
          Content
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });

  it('should not render the content when closed', () => {
    render(
      <Dialog open={false}>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Title</DialogTitle>
          Content
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByTestId('dialog-content')).toBeNull();
  });

  it('should close the dialog if the Escape key is pressed', () => {
    render(
      <Dialog defaultOpen={true}>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Title</DialogTitle>
          Content
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByTestId('dialog-content'), {
      key: 'Escape',
      code: 'Escape',
    });

    expect(screen.queryByTestId('dialog-content')).toBeNull();
  });

  it('should close the dialog when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <Dialog defaultOpen={true}>
        <DialogTrigger data-testid="dialog-trigger">Trigger</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Title</DialogTitle>
          Content
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

    expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();

    await user.click(screen.getByTestId('dialog-overlay'));

    expect(screen.queryByTestId('dialog-content')).toBeNull();
  });

  it('should open the dialog with Enter key', async () => {
    const user = userEvent.setup();
    render(
      <Dialog defaultOpen={false}>
        <DialogTrigger data-testid="dialog-trigger">Trigger</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Title</DialogTitle>
          Content
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByTestId('dialog-trigger');
    trigger.focus();
    expect(trigger).toHaveFocus();
    await user.keyboard('{Enter}');

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
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
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Title</DialogTitle>
            Content
            <DialogDescription>Description</DialogDescription>
          </DialogContent>
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
        <Dialog>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Title</DialogTitle>
            Content
            <DialogDescription>Description</DialogDescription>
          </DialogContent>
        </Dialog>,
      );

      fireEvent.click(screen.getByTestId('dialog-close'));

      expect(screen.queryByTestId('dialog-content')).toBeNull();
    });
  });
});
