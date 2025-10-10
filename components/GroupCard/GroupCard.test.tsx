// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import GroupCard, { GroupCardSkeleton } from './GroupCard';
import { GiftExchangeWithMemberCount } from '@/app/types/giftExchange';

// Mock formatDate - Necessary to make date render correctly without regard to local time
jest.mock('@/lib/utils', () => ({
  formatDate: jest.fn(() => 'December 1, 2025'),
}));

const mockGiftExchange: GiftExchangeWithMemberCount = {
  gift_exchange_id: '123',
  name: 'Group Name',
  description: 'Group Description',
  group_image: 'file.svg',
  budget: '10-20',
  drawing_date: '2025-12-01',
  exchange_date: '2025-12-25',
  owner_id: '456',
  member_count: 3,
};

describe('GroupCard', () => {
  it('renders group name, image, member count, and formatted date', () => {
    render(<GroupCard giftExchange={mockGiftExchange} />);

    expect(screen.getByRole('heading', {name: mockGiftExchange.name})).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', mockGiftExchange.group_image);
    expect(screen.getByText(`${mockGiftExchange.member_count} members`)).toBeInTheDocument();
    expect(screen.getByText('Draw: December 1, 2025')).toBeInTheDocument();
  });

  it('renders singular "member" when member_count is 1', () => {
    render(
      <GroupCard giftExchange={{ ...mockGiftExchange, member_count: 1 }} />,
    );
    expect(screen.getByText('1 member')).toBeInTheDocument();
  });

  it('renders plural "members" when member_count is not 1', () => {
    render(
      <GroupCard giftExchange={{ ...mockGiftExchange, member_count: 2 }} />,
    );
    expect(screen.getByText('2 members')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<GroupCard giftExchange={mockGiftExchange} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/gift-exchanges/${mockGiftExchange.gift_exchange_id}`);
  });
});

describe('GroupCardSkeleton', () => {
  it('renders the skeleton with the testId', () => {
    render(<GroupCardSkeleton />);
    const skeleton = screen.getByTestId('group-card-skeleton');
    expect(skeleton).toBeInTheDocument();
  });
});
