// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';
import { Calendar } from '@/components/Calendar/calendar';
import userEvent from '@testing-library/user-event';
import { BUDGET_OPTIONS } from '@/constants/exchangeGroupOptions';

jest.mock('next/navigation', () => ({
  useRouter: () => {},
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

  describe('Budget input', () => {
    beforeEach(() => {
      Element.prototype.scrollIntoView = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('closes the popover when a selection is made', async () => {
      render(<CreateGroupPage />);

      const user = userEvent.setup();
      const budgetOptionsTriggerButton = screen.getByTestId('budget-button');
      await user.click(budgetOptionsTriggerButton);
      const budgetOptions = screen.getAllByRole('option');
      expect(budgetOptions).toHaveLength(BUDGET_OPTIONS.length);

      const firstBudgetOption = budgetOptions[0];
      await user.click(firstBudgetOption);
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
  });

  describe('Drawing date calendar input', () => {
    it('closes the popover when a selection is made', async () => {
      render(<CreateGroupPage />);

      const user = userEvent.setup();
      const drawingDateTriggerButton = screen.getByTestId(
        'drawing-date-button',
      );
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

      await user.click(drawingDateTriggerButton);
      const calendarDays = screen.getAllByRole('gridcell');
      const firstCalendarDay = calendarDays[calendarDays.length - 1];
      await user.click(firstCalendarDay);
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();
    });
  });

  describe('Exchange date calendar input', () => {
    it('closes the popover when a selection is made', async () => {
      render(<CreateGroupPage />);

      const user = userEvent.setup();
      const drawingDateTriggerButton = screen.getByTestId(
        'exchange-date-button',
      );
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

      await user.click(drawingDateTriggerButton);
      const calendarDays = screen.getAllByRole('gridcell');
      const firstCalendarDay = calendarDays[calendarDays.length - 1];
      await user.click(firstCalendarDay);
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();
    });
  });
});
