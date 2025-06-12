import { render, screen, waitFor } from '@testing-library/react';
import WarningModal from './WarningModal';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';
import { useAuthContext } from '@/context/AuthContextProvider';
import { signInWithGoogle } from '@/lib/utils';
import userEvent from '@testing-library/user-event';

jest.mock('@/context/AuthContextProvider');

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  signInWithGoogle: jest.fn(),
}));

const mockSignInWithGoogle = jest.mocked(signInWithGoogle);

const mockGiftExchange = {
  id: '1',
  name: 'Holiday Gift Exchange',
  description: 'Celebrate the season by exchanging thoughtful gifts!',
  group_image: 'https://example.com/group-image.jpg',
  budget: '30',
  drawing_date: '2025-12-01T00:00:00.000Z',
  exchange_date: '2025-12-25T00:00:00.000Z',
  owner_id: 'user_abc123',
  created_at: new Date('2025-11-01T12:00:00.000Z'),
  updated_at: new Date('2025-11-10T12:00:00.000Z'),
  status: 'active',
};

const mockMembers: GiftExchangeMember[] = [
  {
    id: '456',
    user_id: 'abc',
    gift_exchange_id: '1',
    recipient_id: 'def',
    has_drawn: true,
    member: {
      display_name: 'Alice',
      email: 'alice@example.com',
      avatar: 'asdf',
    },
    recipient: {
      display_name: 'Bob',
      email: 'bob@example.com',
      avatar: 'asdf',
    },
  },
  {
    id: '789',
    user_id: 'def',
    gift_exchange_id: '1',
    recipient_id: 'abc',
    has_drawn: true,
    member: {
      display_name: 'Bob',
      email: 'bob@example.com',
      avatar: 'asdf',
    },
    recipient: {
      display_name: 'Alice',
      email: 'alice@example.com',
      avatar: 'asdf',
    },
  },
];

describe('WarningModal', () => {
  const updateGiftExchangeMembers = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ session: {} });

    render(
      <WarningModal
        giftExchangeData={mockGiftExchange}
        members={mockMembers}
        updateGiftExchangeMembers={updateGiftExchangeMembers}
      />,
    );

    const warningModal = screen.getByTestId('warning-modal');
    const name = screen.getByTestId('name');
    const description = screen.getByTestId('description');
    const budget = screen.getByTestId('budget');
    const members = screen.getByTestId('members');

    expect(warningModal).toBeInTheDocument();
    expect(name).toHaveTextContent('Holiday Gift Exchange');
    expect(description).toHaveTextContent(
      'Celebrate the season by exchanging thoughtful gifts!',
    );
    expect(budget).toHaveTextContent('$30');
    expect(members).toHaveTextContent('2');
  });

  it('renders the sign in with google button, if the user has no session, and calls signInWithGoogle when clicked', async () => {
    (useAuthContext as jest.Mock).mockReturnValue({ session: null });

    render(
      <WarningModal
        giftExchangeData={mockGiftExchange}
        members={mockMembers}
        updateGiftExchangeMembers={updateGiftExchangeMembers}
      />,
    );

    const googleButton = screen.getByTestId('google-button');
    expect(googleButton).toBeInTheDocument();

    userEvent.click(googleButton);

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalledWith({
        redirectPath: `/gift-exchanges/${mockGiftExchange.id}`,
      });
    });
  });

  it('renders the join button, if the user has a session,', async () => {
    (useAuthContext as jest.Mock).mockReturnValue({
      session: { user: { id: '123' } },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;

    render(
      <WarningModal
        giftExchangeData={mockGiftExchange}
        members={mockMembers}
        updateGiftExchangeMembers={updateGiftExchangeMembers}
      />,
    );

    const joinButton = screen.getByTestId('join-button');
    expect(joinButton).toBeInTheDocument();

    userEvent.click(joinButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/gift-exchanges/${mockGiftExchange.id}/members`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ user_id: '123' }),
        }),
      );
    });

    expect(updateGiftExchangeMembers).toHaveBeenCalled();
  });
});
