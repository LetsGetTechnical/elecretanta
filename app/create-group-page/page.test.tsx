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
  it('displays the correct heading text', () => {
    render(<CreateGroupPage />);

    expect(
      screen.getByRole('heading', { name: 'Create Secret Santa Group' }),
    ).toBeInTheDocument();
  });

  it('has the first group image selected by default', () => {
    render(<CreateGroupPage />);

    const [firstTile, ...otherTiles] = screen.getAllByRole('figure');
    expect(firstTile).toHaveAttribute('data-state', 'checked');
    otherTiles.forEach((imageTile) => {
      expect(imageTile).toHaveAttribute('data-state', 'unchecked');
    });
  });

  it('has the cheapest price range selected by default', () => {
    render(<CreateGroupPage />);

    const priceRangeButton = screen.getByRole('combobox');
    expect(priceRangeButton).toHaveTextContent('$10 - $20');
  });

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

  describe('Calendar component in create group page', () => {
    const currentDate = new Date('2025-10-15T00:00:00Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(currentDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('disables past dates correctly', () => {
      render(
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={() => {}}
          disabled={[{ before: currentDate }]}
          initialFocus
        />,
      );

      const pastDate = screen.getByText('13');
      expect(pastDate).toBeDisabled();

      const today = screen.getByText('15');
      expect(today).not.toBeDisabled();

      const tomorrow = screen.getByText('16');
      expect(tomorrow).not.toBeDisabled();
    });
  });
});
