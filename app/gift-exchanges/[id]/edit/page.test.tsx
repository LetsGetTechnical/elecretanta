import { Calendar } from '@/components/Calendar/calendar';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useParams: () => ({
    id: 'test-id',
  }),
}));

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

describe('Calendar component in edit group page', () => {
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

  describe('Calendar popover auto-close behavior', () => {
    it('closes the calendar after selecting a date', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const mockOnSelect = jest.fn();

      render(
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={mockOnSelect}
          disabled={[{ before: currentDate }]}
          initialFocus
        />,
      );

      const day16Button = screen.getByRole('gridcell', { name: '16' });
      await user.click(day16Button);

      await waitFor(() => {
        expect(mockOnSelect).toHaveBeenCalled();
      });
    });
  });
});
