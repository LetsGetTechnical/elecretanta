import { render, screen, act } from '@testing-library/react';
import { CompletedExchangeCard } from './CompletedExchangeCard';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';

const mockMembers: GiftExchangeMember[] = [
  {
    id: '1',
    gift_exchange_id: '1',
    user_id: '1',
    recipient_id: '2',
    has_drawn: true,
    created_at: new Date(),
    updated_at: new Date(),
    member: {
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/john.png',
    },
    recipient: {
      display_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://example.com/jane.png',
    },
  },
  {
    id: '2',
    gift_exchange_id: '1',
    user_id: '2',
    recipient_id: '3',
    has_drawn: true,
    created_at: new Date(),
    updated_at: new Date(),
    member: {
      display_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://example.com/jane.png',
    },
    recipient: {
      display_name: 'Robert Joe',
      email: 'robert.joe@example.com',
      avatar: 'https://example.com/robert.png',
    },
  },
  {
    id: '3',
    gift_exchange_id: '1',
    user_id: '3',
    recipient_id: '1',
    has_drawn: true,
    created_at: new Date(),
    updated_at: new Date(),
    member: {
      display_name: 'Robert Joe',
      email: 'robert.joe@example.com',
      avatar: 'https://example.com/robert.png',
    },
    recipient: {
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/john.png',
    },
  },
];

describe('CompletedExchangeCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the card with confetti animation initially', () => {
    render(<CompletedExchangeCard members={mockMembers} />);
    const card = screen.getByTestId('confetti-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('motion-preset-confetti');
  });

  it('removes confetti animation after 1 second', () => {
    render(<CompletedExchangeCard members={mockMembers} />);
    const card = screen.getByTestId('confetti-card');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(card).not.toHaveClass('motion-preset-confetti');
  });

  it('uses fallback avatar when member avatar is not provided', () => {
    const membersWithoutAvatars = mockMembers.map((member) => ({
      ...member,
      member: { ...member.member, avatar: '' },
      recipient: { ...member.recipient, avatar: '' },
    }));

    render(<CompletedExchangeCard members={membersWithoutAvatars} />);

    const avatars = screen.getAllByRole('img', { name: /avatar/i });
    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute(
        'src',
        expect.stringContaining('vecteezy.com'),
      );
    });
  });

  it('renders the correct number of gift exchange pairs', () => {
    render(<CompletedExchangeCard members={mockMembers} />);

    const members = screen.getAllByTestId(/^member-\d+$/);
    expect(members).toHaveLength(mockMembers.length);
  });
});
