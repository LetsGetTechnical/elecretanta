import { render, screen, waitFor } from '@testing-library/react';
import GiftExchangePage from './page';

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '123' }),
}));

const mockUseAuthContext = {
  session: {
    user: {
      id: 'not-a-member',
    },
  },
};

jest.mock('@/context/AuthContextProvider', () => ({
  useAuthContext() {
    return {
      ...mockUseAuthContext,
    };
  },
}));

describe('GiftExchangePage Warning Modal', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      const urlStr = typeof url === 'string' ? url : url.toString();

      if (urlStr.includes('gift-exchanges/123/members')) {
        return Promise.resolve({
          json: () => Promise.resolve([{ user_id: 'test-user' }]),
        });
      }

      if (urlStr.includes('gift-exchanges/123/giftSuggestions')) {
        return Promise.resolve({
          json: () => Promise.resolve({ match: null, suggestions: [] }),
        });
      }

      return Promise.resolve({
        json: () =>
          Promise.resolve({
            id: '123',
            name: 'Test Exchange',
            status: 'pending',
          }),
      });
    }) as jest.Mock;
  });
  it('renders WarningModal when user is not a member and status is pending', async () => {
    render(<GiftExchangePage />);

    await waitFor(() => {
      const warningModal = screen.getByTestId('warning-modal');
      expect(warningModal).toBeInTheDocument();
    });
  });
});
