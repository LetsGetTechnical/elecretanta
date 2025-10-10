// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, within } from '@testing-library/react';
import GiftDetailsView from './GiftDetailsView';
import { describe } from 'node:test';

const mockGift = {
  id: '1',
  title: 'Blanket',
  price: '$29.99',
  description: 'fuzzy blanket',
  matchReasons: ['fits theme', 'highly rated'],
  matchScore: 98,
  imageUrl: 'https://example.com/fuzzy-blanket.jpg',
};

const mockGiftWithBadUrl = {
  ...mockGift,
  imageUrl: 'bad_url',
};

const mockHandleFeedback = jest.fn();

describe('GiftDetailsView', () => {
  it('renders the component with gift details', () => {
    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    const giftImage = screen.getByRole('img');
    expect(giftImage).toHaveAttribute('src', mockGift.imageUrl);

    const matchScore = screen.getByRole('score');
    expect(matchScore).toHaveTextContent(/98% Match/);

    const price = screen.getByLabelText(/price/i);
    expect(price).toHaveTextContent(mockGift.price);

    const title = screen.getByRole('heading', {
      level: 3,
      name: mockGift.title,
    });
    expect(title).toBeInTheDocument();

    const description = screen.getByText(mockGift.description);
    expect(description).toHaveTextContent(mockGift.description);

    const matchReasons = screen.getByRole('list');
    const matchItems = within(matchReasons)
      .getAllByRole('listitem')
      .map((li) => li.textContent);
    expect(matchItems).toEqual(expect.arrayContaining(mockGift.matchReasons));
  });

  it('generates the correct Amazon URL', async () => {
    // Cloning the env variable
    const original_NEXT_PUBLIC_AMAZON_AFFILIATE_TAG =
      process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;
    process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG = 'test-tag';

    render(
      <GiftDetailsView gift={mockGift} handleFeedback={mockHandleFeedback} />,
    );

    const hrefLink = screen.getByRole('link', { name: /view/i });
    expect(hrefLink).toHaveAttribute(
      'href',
      `https://www.amazon.com/s?k=${mockGift.title}&tag=${process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG}`,
    );

    // Restoring the env variable
    process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG =
      original_NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;
  });

  it('renders default Gift Icon on invalid image url', () => {
    render(
      <GiftDetailsView
        gift={mockGiftWithBadUrl}
        handleFeedback={mockHandleFeedback}
      />,
    );

    const giftIcon = screen.getByRole('img', {
      name: /gift placeholder image/i,
    });

    expect(giftIcon).toBeInTheDocument();
  });
});
