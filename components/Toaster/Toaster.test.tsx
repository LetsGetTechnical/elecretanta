import Toaster from './Toaster';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/context/AuthContextProvider';
import useExchangeGroups from '@/hooks/useExchangeGroups';

jest.mock('@/context/AuthContextProvider');

const mockGroupMember = {
  id: 'test-member-1',
  user_id: 'test-member-1',
  member: { avatar: 'https://example.com/mock-avatar.png' },
};

const mockMemberSession = {
  session: {
    user: mockGroupMember,
  },
};

const mockGroups = [
  {
    gift_exchange_id: 'test-group-1',
    owner_id: 'test-member-1',
  },
  {
    gift_exchange_id: 'test-group-2',
    owner_id: 'test-member-2',
  },
]

jest.mock('@/hooks/useExchangeGroups', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
  toast: jest.fn(),
}));

const variantTestCases = {
  default: {
    title: 'Info!',
    description: 'Info message',
    group: 'test-group-1',
  },
  error: {
    title: 'Error!',
    description: 'This is an error message',
    group: 'test-group-1',
  },
  warning: {
    title: 'Warning',
    description: 'This is a warning message',
    group: 'test-group-2',
  },
  success: {
    title: 'Success!',
    description: 'This is a success message',
    group: 'test-group-2',
  },
};

const mockDismiss = jest.fn();
const setupToastTest = (key: string, value: any) => {
  (useToast as jest.Mock).mockReturnValue({
    toasts: [
      {
        id: 'test-id',
        title: value.title,
        description: value.description,
        variant: key,
        group: value.group,
        onOpenChange: mockDismiss,
      },
    ],
    toast: jest.fn(),
    dismiss: mockDismiss,
  });
  (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
  (useExchangeGroups as jest.Mock).mockReturnValue(mockGroups);
  render(
    <Toaster />
  );
};

describe('ToastNotification', () => {
  it.each(Object.entries(variantTestCases))(
    'should render the %s toast correctly if the member is the group owner',
    (key, value) => {
      setupToastTest(key, value);
      if (value.group === 'test-group-1') {
        expect(screen.getByText(value.title)).toBeInTheDocument();
        expect(screen.getByText(value.description)).toBeInTheDocument();
      }
      else if (value.group === 'test-group-2') {
        expect(screen.queryByText(value.title)).not.toBeInTheDocument();
        expect(screen.queryByText(value.description)).not.toBeInTheDocument();
      }
    },
  );

  it.each(Object.entries(variantTestCases))(
    'should render the dismiss button for the %s variant if the member is the group owner',
    async (key, value) => {
      setupToastTest(key, value);
      if (value.group === 'test-group-1') {
        const dismissButton = screen.queryByRole('button', { name: 'Close' });
        expect(dismissButton).toBeInTheDocument();
      }
    },
  );
  it.each(Object.entries(variantTestCases))(
    'should dismiss the %s toast when the dismiss button is clicked',
    async (key, value) => {
      setupToastTest(key, value);
      if (value.group === 'test-group-1') {
        const dismissButton = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(dismissButton);
        expect(mockDismiss).toHaveBeenCalled();
      }
    },
  );
});
