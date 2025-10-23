// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';
import { Calendar } from '@/components/Calendar/calendar';

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
  describe('Calendar component in create group page', () => {
    it('disables past dates correctly', () => {
      const currentDate = new Date('2025-10-08T00:00:00Z');

      render(
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={() => {}}
          disabled={[{ before: currentDate }]}
          initialFocus
        />,
      );

      const pastDate = screen.getByText('5');
      expect(pastDate).toBeDisabled();

      const today = screen.getByText('8');
      expect(today).not.toBeDisabled();

      const tomorrow = screen.getByText('9');
      expect(tomorrow).not.toBeDisabled();
    });
  });

  it('has the first group image selected by default', () => {
    render(<CreateGroupPage />);

    const [firstTile, ...otherTiles] = screen.getAllByRole('figure');
    expect(firstTile).toHaveAttribute('data-state', 'checked');
    otherTiles.forEach((imageTile) => {
      expect(imageTile).toHaveAttribute('data-state', 'unchecked');
    });
  });
});
