import { Calendar } from '@/components/Calendar/calendar';
import { render, screen } from '@testing-library/react';

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
