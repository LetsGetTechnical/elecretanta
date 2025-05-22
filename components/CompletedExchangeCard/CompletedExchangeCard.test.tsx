import { render, screen } from '@testing-library/react';
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
      avatar: 'https://example.com/avatar.png',
    },
    recipient: {
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
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
      display_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatar: 'https://example.com/avatar.png',
    },
    recipient: {
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
    },
  },
];
describe('CompletedExchangeCard', () => {
  it('should render', () => {
    render(<CompletedExchangeCard members={mockMembers} />);
    expect(screen.getByTestId('confetti-card')).toBeInTheDocument();
  });

  it('after 1 second, the confetti card should not be in the document', () => {
    render(<CompletedExchangeCard members={mockMembers} />);
    expect(screen.getByTestId('confetti-card')).toBeInTheDocument();
    setTimeout(() => {
      expect(screen.getByTestId('confetti-card')).not.toBeInTheDocument();
    }, 1000);
  });

  it('should render the members', () => {
    render(<CompletedExchangeCard members={mockMembers} />);
    expect(screen.getByTestId('member-1')).toBeInTheDocument();
    expect(screen.getByTestId('member-2')).toBeInTheDocument();
  });
});
