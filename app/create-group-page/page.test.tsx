// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// Mock scrollIntoView for cmdk Command component
Element.prototype.scrollIntoView = jest.fn();

describe('Create Group Page', () => {
  it('has the first group image selected by default', () => {
    render(<CreateGroupPage />);

    const [firstTile, ...otherTiles] = screen.getAllByRole('figure');
    expect(firstTile).toHaveAttribute('data-state', 'checked');
    otherTiles.forEach((imageTile) => {
      expect(imageTile).toHaveAttribute('data-state', 'unchecked');
    });
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

  describe('Popover auto-close behavior', () => {
    const currentDate = new Date('2025-10-15T00:00:00Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(currentDate);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('closes the budget popover after selecting a price range', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<CreateGroupPage />);

      const budgetButton = screen.getByRole('combobox', { name: /price range/i });
      await user.click(budgetButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/search price ranges/i)).toBeInTheDocument();
      });

      const priceOption = screen.getByRole('option', { name: /\$10 - \$20/i });
      await user.click(priceOption);

      await waitFor(() => {
        expect(screen.queryByPlaceholderText(/search price ranges/i)).not.toBeInTheDocument();
      });
    });

    it('closes the gift drawing date calendar after selecting a date', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<CreateGroupPage />);

      const drawingDateButton = screen.getByRole('button', { name: /gift drawing date/i });
      await user.click(drawingDateButton);

      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });

      const day16Button = screen.getByRole('gridcell', { name: '16' });
      await user.click(day16Button);

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('closes the gift exchange date calendar after selecting a date', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<CreateGroupPage />);

      // First select a drawing date
      const drawingDateButton = screen.getByRole('button', { name: /gift drawing date/i });
      await user.click(drawingDateButton);
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      await user.click(screen.getByRole('gridcell', { name: '16' }));
      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });

      // Now test exchange date popover
      const exchangeDateButton = screen.getByRole('button', { name: /gift exchange date/i });
      await user.click(exchangeDateButton);

      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });

      const day17Button = screen.getByRole('gridcell', { name: '17' });
      await user.click(day17Button);

      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });
  });
});
