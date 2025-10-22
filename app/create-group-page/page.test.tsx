import { Calendar } from '@/components/Calendar/calendar';
import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';
import userEvent from '@testing-library/user-event';

// getting 2 warnings: 
// 1) fill=true (Image props different than img props)
// 2) ImageGroup doesn't have forwardRef

const priceRanges = [
  { label: '$10 - $20', value: '10-20' },
  { label: '$20 - $30', value: '20-30' },
  { label: '$30 - $40', value: '30-40' },
  { label: '$40 - $50', value: '40-50' },
  { label: '$50 - $60', value: '50-60' },
  { label: '$60 - $70', value: '60-70' },
  { label: '$70 - $80', value: '70-80' },
  { label: '$80 - $90', value: '80-90' },
  { label: '$90 - $100', value: '90-100' },
] as const;

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
  describe('Calendar component', () => {
    it('disables past dates correctly', () => {
      const currentDate = new Date('2025-10-15T00:00:00Z');

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
      const budgetTriggerButton = screen.getByTestId('budget-button');
      await user.click(budgetTriggerButton);
      const budgetOptions = screen.getAllByRole('option')
      expect(budgetOptions).toHaveLength(priceRanges.length)
      expect(budgetOptions[0]).toHaveAttribute('aria-selected', "true")
      expect(budgetOptions[1]).toHaveAttribute('aria-selected', "false")
      await user.click(budgetOptions[1])

      expect(screen.queryByRole('option')).not.toBeInTheDocument()
    });
  });
  
  describe('Drawing date calendar input', () => {
    it('closes the popover when a selection is made', async () => {
      render(<CreateGroupPage />);

      const user = userEvent.setup();
      const drawingDateTriggerButton = screen.getByTestId('drawing-date-button');
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument()

      await user.click(drawingDateTriggerButton);
      const calendarDays = screen.getAllByRole('gridcell')

      await user.click(calendarDays[calendarDays.length-1])
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument()
    });
  });

  describe('Exchange date calendar input', () => {
    it('closes the popover when a selection is made', async () => {
      render(<CreateGroupPage />);

      const user = userEvent.setup();
      const drawingDateTriggerButton = screen.getByTestId('exchange-date-button');
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument()

      await user.click(drawingDateTriggerButton);
      const calendarDays = screen.getAllByRole('gridcell')

      await user.click(calendarDays[calendarDays.length-1])
      expect(screen.queryByRole('gridcell')).not.toBeInTheDocument()
    });
  });
});
