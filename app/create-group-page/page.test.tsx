// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

describe('Create Group Page', () => {
  it('has the first group image selected by default', () => {
    render(<CreateGroupPage />);

    const [firstTile, ...otherTiles] = screen.getAllByRole('figure');
    expect(firstTile).toHaveAttribute('data-state', 'checked');
    otherTiles.forEach((imageTile) => {
      expect(imageTile).toHaveAttribute('data-state', 'unchecked');
    });
  });
});
