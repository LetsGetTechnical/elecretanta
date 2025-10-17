// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { GROUP_IMAGES } from '../ImageSelector/ImageSelector';
import GroupCard from './GroupCard';

const mockGiftExchange = {
  id: '123',
  name: 'Test Exchange',
  budget: '50',
  status: 'pending',
  group_image: 'invalid_src',
  drawing_date: '',
  exchange_date: '',
  owner_id: '',
  gift_exchange_id: '',
  description: '',
  member_count: 1,
};

describe('GiftExchangeHeader', () => {
  it('passes the src and alt to the <Image/> when the src IS in the GROUP_IMAGES list', () => {
    const validImage = GROUP_IMAGES[1];
    const giftExchangeWithValidImageSrc = {
      ...mockGiftExchange,
      group_image: validImage.src,
    };
    render(<GroupCard giftExchange={giftExchangeWithValidImageSrc} />);

    const image = screen.getByRole('img', { name: validImage.alt });
    expect(image).toHaveAttribute('src', validImage.src);
  });

  it('passes the fallback src and alt to the <Image/> when the src is NOT in the GROUP_IMAGES list', () => {
    const fallbackImage = GROUP_IMAGES[0];

    render(<GroupCard giftExchange={mockGiftExchange} />);

    const image = screen.getByRole('img', { name: fallbackImage.alt });
    expect(image).toHaveAttribute('src', fallbackImage.src);
  });
});
