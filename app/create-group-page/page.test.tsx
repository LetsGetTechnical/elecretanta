// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';
import { Calendar } from '@/components/Calendar/calendar';
import userEvent from '@testing-library/user-event';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

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
  const setupFormWithValidData = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/group name/i), 'Test Group');
    await user.type(
      screen.getByLabelText(/group description/i),
      'Test Description',
    );
    await user.click(screen.getAllByRole('radio')[0]);

    // Budget selection
    await user.click(screen.getByLabelText(/price range/i));
    await user.click(screen.getAllByRole('option')[0]);

    // Drawing date selection
    await user.click(screen.getByLabelText(/drawing date/i));
    const drawingCalendarDays = screen.getAllByRole('gridcell');
    await user.click(drawingCalendarDays[drawingCalendarDays.length - 2]);

    // Exchange date selection
    await user.click(screen.getByLabelText(/exchange date/i));
    const exchangeCalendarDays = screen.getAllByRole('gridcell');
    await user.click(exchangeCalendarDays[exchangeCalendarDays.length - 1]);
  };

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

  describe('Form submission', () => {
    let mockFetch: jest.Mock;
    let resolvePromise: (value: any) => void;

    beforeEach(() => {
      resolvePromise = jest.fn();
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch = jest.fn().mockReturnValue(pendingPromise);
      global.fetch = mockFetch;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('disables submit button and shows loading state while submitting form', async () => {
      render(<CreateGroupPage />);
      const user = userEvent.setup();

      await setupFormWithValidData(user);

      const submitButton = screen.getByRole('button', {name: /create group/i});
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent(/creating/i);

      resolvePromise({
        ok: true,
        json: () => Promise.resolve({ id: '1' }),
      });
    });
  });
});
