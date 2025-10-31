import { render, screen } from '@testing-library/react';
import GiftExchangePage from './page';
import { useAuthContext } from '@/context/AuthContextProvider';

const mockGiftExchangeData = {
  id: '123',
  name: 'Test Exchange',
  budget: '50',
};

const mockMembers = [
  {
    id: '1',
    user_id: 'test-member',
    member: { avatar: 'https://example.com/mock-avatar.png' },
  },
];

const mockGiftSuggestions = {
  match: null,
  suggestions: [],
};

jest.mock('@/app/api/openaiConfig/config', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '123' }),
}));

jest.mock('@/context/AuthContextProvider');

describe('GiftExchangePage', () => {
  describe('GiftExchangePage Warning Modal', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: async () => ({ ...mockGiftExchangeData, status: 'pending' }),
        })
        .mockResolvedValueOnce({
          json: async () => mockMembers,
        })
        .mockResolvedValueOnce({
          json: async () => mockGiftSuggestions,
        });
    });

    it('displays the WarningModal with the join button for a logged-in user who is not a member of a pending group', async () => {
      (useAuthContext as jest.Mock).mockReturnValue({
        session: {
          user: {
            id: 'not-a-member',
          },
        },
      });

      render(<GiftExchangePage />);

      const warningModal = await screen.findByTestId('warning-modal');
      const joinButton = screen.getByTestId('join-button');

      expect(warningModal).toBeInTheDocument();
      expect(joinButton).toBeInTheDocument();
    });

    it('displays the WarningModal with a Google sign-in button for users who are not signed in and not members of a pending group', async () => {
      (useAuthContext as jest.Mock).mockReturnValue({ session: null });

      render(<GiftExchangePage />);

      const warningModal = await screen.findByTestId('warning-modal');
      const googleButton = screen.getByTestId('google-button');

      expect(warningModal).toBeInTheDocument();
      expect(googleButton).toBeInTheDocument();
    });
  });

  describe('GiftExchangePage Redirect Cards', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('displays a BAD LINK Redirect Card if the exchange is not valid', async () => {
      (useAuthContext as jest.Mock).mockReturnValue({
        session: { user: mockMembers[0] },
      });

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: async () => ({ error: '' }),
        })
        .mockResolvedValueOnce({
          json: async () => ({ error: '' }),
        })
        .mockResolvedValueOnce({
          json: async () => ({ error: '' }),
        });

      render(<GiftExchangePage />);

      const card = await screen.findByTestId('card-title');
      expect(card).toHaveTextContent(/bad link/i);

      const homeButton = screen.getByRole('link');
      expect(homeButton).toHaveTextContent(/home/i);
    });

    it('displays a LOG IN Redirect Card if a user is not logged in and the group is not pending', async () => {
      (useAuthContext as jest.Mock).mockReturnValue({ session: null });

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: async () => ({ ...mockGiftExchangeData, status: 'active' }),
        })
        .mockResolvedValueOnce({
          json: async () => mockMembers,
        })
        .mockResolvedValueOnce({
          json: async () => mockGiftSuggestions,
        });

      render(<GiftExchangePage />);

      const card = await screen.findByTestId('card-title');
      expect(card).toHaveTextContent(/log in/i);

      const homeButton = screen.getByRole('link');
      expect(homeButton).toHaveTextContent(/home/i);
    });

    it('displays an EXPIRED LINK Redirect Card if a user is logged in but not a member of the group and the group is not pending', async () => {
      (useAuthContext as jest.Mock).mockReturnValue({
        session: {
          user: {
            id: 'not-a-member',
          },
        },
      });

      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: async () => ({ ...mockGiftExchangeData, status: 'active' }),
        })
        .mockResolvedValueOnce({
          json: async () => mockMembers,
        })
        .mockResolvedValueOnce({
          json: async () => mockGiftSuggestions,
        });

      render(<GiftExchangePage />);

      const card = await screen.findByTestId('card-title');
      expect(card).toHaveTextContent(/expired link/i);

      const homeButton = screen.getByRole('link');
      expect(homeButton).toHaveTextContent(/home/i);
    });
  });
});
