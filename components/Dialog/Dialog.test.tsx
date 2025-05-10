import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from './index';

const TestDialogComponents: React.FC<{
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  controlled?: boolean;
}> = ({ onOpenChange, open, defaultOpen, controlled = false }) => {
  const dialogProps = controlled
    ? { open, onOpenChange }
    : { defaultOpen, onOpenChange };

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild data-testid="dialog-trigger">
        Dialog Trigger
      </DialogTrigger>
      <DialogContent data-testid="dialog-content" aria-describedby={undefined}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription id="test-dialog-description">
          Dialog Description
        </DialogDescription>
        <DialogClose asChild data-testid="dialog-close">
          <button>Close Button</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

describe('Dialog (Root Component)', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Basic Rendering and Composition', () => {
    test('should render trigger and content correctly when opened', async () => {
      render(<TestDialogComponents />);

      const triggerButton = screen.getByTestId('dialog-trigger');
      expect(triggerButton).toBeInTheDocument();

      expect(screen.getByTestId('dialog-title')).not.toBeInTheDocument();
      expect(screen.getByTestId('dialog-description')).not.toBeInTheDocument();

      await user.click(triggerButton);

      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-description')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled State Management', () => {
    test('should open when DialogTrigger is clicked and close with Escape key', async () => {
      render(<TestDialogComponents />);

      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('dialog-trigger'));
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
      });
    });

    test('should open when DialogTrigger is clicked and close by clicking DialogOverlay', async () => {
      render(<TestDialogComponents />);

      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('dialog-trigger'));
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

      await user.click(screen.getByTestId('dialog-overlay'));
      await waitFor(() => {
        expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
      });
    });

    test('should open when DialogTrigger is clicked and close by clicking DialogClose button', async () => {
      render(<TestDialogComponents />);

      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('dialog-trigger'));
      expect(screen.getByTestId('dialog-content')).toBeVisible();

      await user.click(screen.getByTestId('dialog-close'));
      await waitFor(() => {
        expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
      });
    });
  });

  describe('Controlled State Management', () => {
    test('visibility should be controlled by the "open" prop', () => {
      const onOpenChange = jest.fn();
      const { rerender } = render(
        <TestDialogComponents
          open={false}
          onOpenChange={onOpenChange}
          controlled
        />,
      );

      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

      rerender(
        <TestDialogComponents
          open={true}
          onOpenChange={onOpenChange}
          controlled
        />,
      );
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

      rerender(
        <TestDialogComponents
          open={false}
          onOpenChange={onOpenChange}
          controlled
        />,
      );
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    });
  });
});
