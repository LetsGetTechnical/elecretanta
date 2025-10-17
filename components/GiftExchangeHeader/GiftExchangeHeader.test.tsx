// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { GiftExchangeHeader } from './GiftExchangeHeader';
import { GROUP_IMAGES } from '../ImageSelector/ImageSelector';

const mockGiftExchangeData = {
  id: '123',
  name: 'Test Exchange',
  budget: '50',
  status: 'pending',
  group_image: 'invalid_src',
  drawing_date: '',
  exchange_date: '',
  owner_id: '',
};

describe('GiftExchangeHeader', () => {
  it('passes the src and alt to the <Image/> when the src IS in the GROUP_IMAGES list', () => {
    const validImage = GROUP_IMAGES[1];
    const giftExchangeWithValidImageSrc = {
      ...mockGiftExchangeData,
      group_image: validImage.src,
    };
    render(
      <GiftExchangeHeader
        giftExchangeData={giftExchangeWithValidImageSrc}
        members={[]}
        id={undefined}
      />,
    );

    const image = screen.getByRole('img', { name: validImage.alt });
    expect(image).toHaveAttribute('src', validImage.src);
  });

  it('passes the fallback src and alt to the <Image/> when the src is NOT in the GROUP_IMAGES list', () => {
    const fallbackImage = GROUP_IMAGES[0];

    render(
      <GiftExchangeHeader
        giftExchangeData={mockGiftExchangeData}
        members={[]}
        id={undefined}
      />,
    );

    const image = screen.getByRole('img', { name: fallbackImage.alt });
    expect(image).toHaveAttribute('src', fallbackImage.src);
  });
});
