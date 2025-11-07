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

jest.mock('@radix-ui/react-avatar', () => ({
  ...jest.requireActual('@radix-ui/react-avatar'),
  Image: (props: typeof Image) => <img data-testid="avatar-image" {...props} />,
}));

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

  it('renders the correct member pairings', () => {
    render(<CompletedExchangeCard members={mockMembers} />);

    const givingMembers = screen.getAllByTestId(/^member-\d+$/);
    const recipients = screen.getAllByTestId(/^recipient-\d+$/);
    const avatars = screen.getAllByTestId(/avatar-image/i);

    // Matching givers to recipients by name
    expect(givingMembers[0]).toHaveTextContent('John Doe');
    expect(recipients[0]).toHaveTextContent('Jane Smith');

    expect(givingMembers[1]).toHaveTextContent('Jane Smith');
    expect(recipients[1]).toHaveTextContent('Robert Joe');

    expect(givingMembers[2]).toHaveTextContent('Robert Joe');
    expect(recipients[2]).toHaveTextContent('John Doe');

    // Matching givers to recipients by avatars
    // John => Jane
    expect(avatars[0]).toHaveAttribute(
      'src',
      expect.stringMatching(/john.png/i),
    );
    expect(avatars[1]).toHaveAttribute(
      'src',
      expect.stringMatching(/jane.png/i),
    );
    // Jane => Robert
    expect(avatars[2]).toHaveAttribute(
      'src',
      expect.stringMatching(/jane.png/i),
    );
    expect(avatars[3]).toHaveAttribute(
      'src',
      expect.stringMatching(/robert.png/i),
    );
    // Robert => John
    expect(avatars[4]).toHaveAttribute(
      'src',
      expect.stringMatching(/robert.png/i),
    );
    expect(avatars[5]).toHaveAttribute(
      'src',
      expect.stringMatching(/john.png/i),
    );
  });
});
