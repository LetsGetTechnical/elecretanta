import { render, screen, waitFor } from '@testing-library/react';
import GiftExchangePage from './page';
import { useAuthContext } from '@/context/AuthContextProvider';
import * as utils from '@/lib/utils';
import { TOASTS } from '@/components/Toast/toasts.consts';

const routerPush = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '123' }),
  useRouter: () => ({
    push: routerPush,
  }),
}));

jest.mock('@/context/AuthContextProvider');

jest.mock('@/app/api/openaiConfig/config', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

const mockToast = jest.fn();

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: mockToast,
  })),
}));

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  signInWithGoogle: jest.fn(),
}));

const mockGiftExchangeData = {
  id: '123',
  name: 'Test Exchange',
  budget: '50',
};

const mockGiftSuggestions = {
  match: null,
  suggestions: [],
};

const mockGroupMember = {
  id: '1',
  user_id: 'test-member',
  member: { avatar: 'https://example.com/mock-avatar.png' },
};

const mockNonGroupMember = { ...mockGroupMember, id: 'not-a-member' };

const mockMembers = [mockGroupMember];

const mockMemberSession = {
  session: {
    user: mockGroupMember,
  },
};

const mockNonMemberSession = {
  session: {
    user: mockNonGroupMember,
  },
};

const mockNoSession = { session: null };

describe('GiftExchangePage', () => {
  const mockDataFetch = (status: string) => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({ ...mockGiftExchangeData, status }),
      })
      .mockResolvedValueOnce({
        json: async () => mockMembers,
      })
      .mockResolvedValueOnce({
        json: async () => mockGiftSuggestions,
      });
  };

  const mockFetchWithoutValidData = () => {
    (global.fetch as jest.Mock)
    .mockResolvedValue({
      json: async () => ({ error: 'Error' }),
    });
  };

  const mockRejectedFetch = () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce({});
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the WarningModal with the join button for a logged-in user who is not a member of a pending group', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNonMemberSession);
    mockDataFetch('pending');

    render(<GiftExchangePage />);

    const warningModal = await screen.findByTestId('warning-modal');
    const joinButton = screen.getByTestId('join-button');

    expect(warningModal).toBeInTheDocument();
    expect(joinButton).toBeInTheDocument();
  });

  it('displays the WarningModal with a Google sign-in button for users who are not signed in and not members of a pending group', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNoSession);
    mockDataFetch('pending');

    render(<GiftExchangePage />);

    const warningModal = await screen.findByTestId('warning-modal');
    const googleButton = screen.getByTestId('google-button');

    expect(warningModal).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  it('redirects to user dashboard and displays Bad Link toast if URL is invalid', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
    mockFetchWithoutValidData();

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith('/dashboard');

      expect(mockToast).toHaveBeenCalledWith(TOASTS.badLinkToast);
    });
  });

  it('displays a Server Error toast if data fetching throws an error', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
    mockRejectedFetch();

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(TOASTS.errorToast);
    });
  });

  it('redirects to the dashboard and displays an Expired Link toast if user is not a member of a group that has already had its Drawing', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNonMemberSession);
    mockDataFetch('active');

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith('/dashboard');

      expect(mockToast).toHaveBeenCalledWith(TOASTS.expiredLinkToast);
    });
  });

  it('calls signInWithGoogle function if the user is not logged in and the group has already had its Drawing', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNoSession);
    (utils.signInWithGoogle as jest.Mock).mockResolvedValue(undefined);
    mockDataFetch('active');

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(utils.signInWithGoogle as jest.Mock).toHaveBeenCalledWith({
        redirectPath: expect.any(String),
      });
    });
  });
});
