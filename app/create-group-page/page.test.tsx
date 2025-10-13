import { Calendar } from '@/components/Calendar/calendar';
import { render, screen } from '@testing-library/react';

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
  });
});
