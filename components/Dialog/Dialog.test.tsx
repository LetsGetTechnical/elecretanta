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

interface TestDialogComponentsProps {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  controlled?: boolean;
}

/**
 * Test component that renders a Dialog with all its subcomponents.
 * Used to test both controlled and uncontrolled dialog behavior.
 *
 * @param {Object} props - Component props
 * @param {(open: boolean) => void} [props.onOpenChange] - Callback fired when dialog open state changes
 * @param {boolean} [props.open] - Controls the open state (for controlled mode)
 * @param {boolean} [props.defaultOpen] - Sets initial open state (for uncontrolled mode)
 * @param {boolean} [props.controlled=false] - Whether to use controlled or uncontrolled mode
 * @returns {JSX.Element} The test dialog component
 */

const TestDialogComponents = ({
  onOpenChange,
  open,
  defaultOpen,
  controlled = false,
}: TestDialogComponentsProps) => {
  const dialogProps = controlled
    ? { open, onOpenChange }
    : { defaultOpen, onOpenChange };

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild data-testid="dialog-trigger">
        <button>Dialog Trigger</button>
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

      expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('dialog-description'),
      ).not.toBeInTheDocument();

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
