import { render, screen } from '@testing-library/react';
import { Calendar } from './calendar';
import userEvent from '@testing-library/user-event';

describe('Calendar', () => {
  it('displays the same number of weeks/rows for every month of the year', () => {
    render(<Calendar initialFocus />);

    const user = userEvent.setup();
    const daysDisplayedCount = screen.getAllByRole('gridcell').length;
    expect(daysDisplayedCount).toBeGreaterThan(31);

    Array(12).forEach(async () => {
      const nextMonthButton = screen.getByLabelText('Go to next month');
      await user.click(nextMonthButton);

      expect(screen.getAllByRole('gridcell')).toHaveLength(daysDisplayedCount);
    });
  });
});
