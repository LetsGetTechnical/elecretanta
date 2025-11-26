import { Calendar } from '@/components/Calendar/calendar';
import { render, screen } from '@testing-library/react';
import EditGroupPage from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useParams: () => ({
    id: 'mock-group-id',
  }),
}));

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;
global.fetch = jest
  .fn()
  .mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ owner_id: '1', name: '' }),
  });

describe('Edit Group Page', () => {
  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
    global.fetch = jest
      .fn()
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ owner_id: '1', name: '' }),
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Close (X) button in edit group page', () => {
    it('renders the X button with the correct href', () => {
      render(<EditGroupPage />);

      expect(screen.getByTestId('x-button')).toHaveAttribute(
        'href',
        '/dashboard',
      );
    });
  });

  describe('Cancel button in edit group page', () => {
    it('renders the Cancel button with the correct href', () => {
      render(<EditGroupPage />);

      expect(screen.getByRole('link', { name: /cancel/i })).toHaveAttribute(
        'href',
        '/dashboard',
      );
    });
  });

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
  });
});
