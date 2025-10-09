import { Calendar } from '@/components/Calendar/calendar';
import { render } from '@testing-library/react';

describe('Calendar component in create group page', () => {
  it('disables past dates before today', () => {
    const currentDate = new Date('2025-10-08T00:00:00Z');
    const disabledFunction = (date: Date) => date < currentDate;

    render(
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={() => {}}
        disabled={disabledFunction}
        initialFocus
      />,
    );

    const yesterday = new Date('2025-10-07T00:00:00Z');
    const today = new Date('2025-10-08T00:00:00Z');
    const tomorrow = new Date('2025-10-09T00:00:00Z');

    expect(disabledFunction(yesterday)).toBe(true);
    expect(disabledFunction(today)).toBe(false);
    expect(disabledFunction(tomorrow)).toBe(false);
  });
});
