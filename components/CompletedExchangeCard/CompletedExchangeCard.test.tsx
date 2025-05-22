import { render, screen, act } from '@testing-library/react';
import { CompletedExchangeCard } from './CompletedExchangeCard';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';

// Mock the AvatarImage component to simulate image loading behavior
jest.mock('@/components/Avatar/AvatarImage', () => ({
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => {
    // Simulate image load error for invalid URLs
    if (src.includes('invalid-url')) {
      return null;
    }
    return <img src={src} alt={alt} data-testid="avatar-image" />;
  },
}));

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
      avatar: 'https://example.com/avatar.png',
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
    recipient_id: '1',
    has_drawn: true,
    created_at: new Date(),
    updated_at: new Date(),
    member: {
      display_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://example.com/jane.png',
    },
    recipient: {
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
    },
  },
];

describe('CompletedExchangeCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
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

  it('displays all members and their recipients correctly', () => {
    render(<CompletedExchangeCard members={mockMembers} />);
    expect(
      screen.getByText('John Doe gifted to Jane Smith'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Jane Smith gifted to John Doe'),
    ).toBeInTheDocument();
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

  it('uses fallback avatar when invalid image URL is provided', () => {
    const membersWithInvalidAvatars = mockMembers.map((member) => ({
      ...member,
      member: { ...member.member, avatar: 'https://invalid-url.com/image.png' },
      recipient: {
        ...member.recipient,
        avatar: 'https://another-invalid-url.com/image.png',
      },
    }));

    render(<CompletedExchangeCard members={membersWithInvalidAvatars} />);

    // Should show fallback avatars for all invalid images
    const fallbackAvatars = screen.getAllByRole('img', {
      name: /default avatar/i,
    });
    expect(fallbackAvatars).toHaveLength(4); // 2 members × 2 avatars each

    fallbackAvatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute(
        'src',
        expect.stringContaining('vecteezy.com'),
      );
    });
  });

  it('renders the correct number of gift exchange pairs', () => {
    render(<CompletedExchangeCard members={mockMembers} />);

    const memberElements = screen.getAllByTestId(/^member-\d+$/);
    expect(memberElements).toHaveLength(mockMembers.length);
  });
});
