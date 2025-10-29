// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { GROUP_IMAGES, ImageSelector } from './ImageSelector';

describe('ImageSelector', () => {
  it('renders the same number of images as the length of the GROUP_IMAGES list', () => {
    render(<ImageSelector />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(GROUP_IMAGES.length);
  });

  it('renders image titles correctly', () => {
    render(<ImageSelector />);

    const image_cards = screen.getAllByRole('figure');

    image_cards.forEach((card, index) => {
      expect(card).toHaveTextContent(GROUP_IMAGES[index].title);
    });
  });
});
