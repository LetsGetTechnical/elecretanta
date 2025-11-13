// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Calendar } from '@/components/Calendar/calendar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'next/navigation';
import EditGroupPage from './page';
import { BUDGET_OPTIONS } from '@/constants/exchangeGroupOptions';

global.fetch = jest.fn(() => Promise.resolve({})) as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

global.fetch = jest.fn();

describe('Edit Group Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: '',
          description: '',
          drawing_date: new Date(),
          exchange_date: new Date(),
          budget: '',
          group_image: '',
        }),
    });

    (useParams as jest.Mock).mockReturnValue('0');

    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Calendar component', () => {
    const currentDate = new Date('2025-10-15T00:00:00Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(currentDate);
    })

    afterEach(() => {
      jest.useRealTimers();
    })

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
    it('closes the popover when a selection is made', async () => {
      render(<EditGroupPage />);

      const user = userEvent.setup();
      const budgetsTriggerButton = screen.getByTestId('budget-button');
      await user.click(budgetsTriggerButton);
      const budgetOptions = screen.getAllByRole('option');
      expect(budgetOptions).toHaveLength(BUDGET_OPTIONS.length);

      const firstBudgetOption = budgetOptions[0];
      await user.click(firstBudgetOption);
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
  });

  describe('Drawing date calendar input', () => {
    it('closes the popover when a selection is made', async () => {
      render(<EditGroupPage />);

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
      render(<EditGroupPage />);

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
