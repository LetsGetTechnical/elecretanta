import Toaster from './Toaster';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
  toast: jest.fn(),
}));

const variantTestCases = {
  default: {
    title: 'Info!',
    description: 'Info message',
  },
  error: {
    title: 'Error!',
    description: 'This is an error message',
  },
  warning: {
    title: 'Warning',
    description: 'This is a warning message',
  },
  success: {
    title: 'Success!',
    description: 'This is a success message',
  },
};

const setupToastTest = (key: string, value: any) => {
  (useToast as jest.Mock).mockReturnValue({
    toasts: [{
      id: "test-id",
      title: value.title,
      description: value.description,
      variant: key,
    }],
    toast: jest.fn(),
    dismiss: jest.fn(),
  });
  render(<Toaster />);
};

describe('ToastNotification', () => {
  it.each(Object.entries(variantTestCases))(
  "should render the %s toast correctly",
  (key, value) => {
    setupToastTest(key, value);
    expect(screen.getByText(value.title)).toBeInTheDocument();
    expect(screen.getByText(value.description)).toBeInTheDocument();
  }
);

  it.each(Object.entries(variantTestCases))(
    "should render the dismiss button for the %s variant", async (key, value) => {
      setupToastTest(key, value);

      const dismissButton = screen.queryByRole('button', { name: 'Close' });
      expect(dismissButton).toBeInTheDocument();
    }
  );
it.each(Object.entries(variantTestCases))(
    "should dismiss the %s toast when the dismiss button is clicked",
    async (key, value) => {

      const mockDismiss = jest.fn();
      (useToast as jest.Mock).mockReturnValue({
        toasts: [{
          id: "test-id",
          title: value.title,
          description: value.description,
          variant: key,
          onOpenChange: mockDismiss,
        }],
        toast: jest.fn(),
        dismiss: mockDismiss,
      });

      render(<Toaster />);

      const dismissButton = screen.getByRole('button', { name: 'Close' });
      fireEvent.click(dismissButton);

      expect(mockDismiss).toHaveBeenCalled();
    }
  );
})