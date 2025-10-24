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
  describe('Close (X) button', () => {
    it('renders the X button with the correct href', () => {
      render(<CreateGroupPage />);

      expect(screen.getByTestId('x-button')).toHaveAttribute(
        'href',
        '/dashboard',
      );
    });

    describe('Cancel button', () => {
      it('renders the Cancel button with the correct href', () => {
        render(<CreateGroupPage />);

        expect(screen.getByRole('link', { name: /cancel/i })).toHaveAttribute(
          'href',
          '/dashboard',
        );
      });
    });
  });
});

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
