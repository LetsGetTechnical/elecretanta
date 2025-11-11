// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';
import { Calendar } from '@/components/Calendar/calendar';
import userEvent from '@testing-library/user-event';

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
  const currentDate = new Date('2025-10-15T18:00:00Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(currentDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Calendar component in create group page', () => {
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
  
  it('has the first group image selected by default', () => {
    render(<CreateGroupPage />);
    
    const [firstTile, ...otherTiles] = screen.getAllByRole('figure');
    expect(firstTile).toHaveAttribute('data-state', 'checked');
    otherTiles.forEach((imageTile) => {
      expect(imageTile).toHaveAttribute('data-state', 'unchecked');
    });
  });
  
  it('does not show a validation error for the Calendar input when the user clicks on the default date and tries to submit the form', async () => {
    render(<CreateGroupPage />);

    jest.useRealTimers();
    
    const user = userEvent.setup()

    // const drawingDateButton1 = screen.getAllByTestId('popover-trigger')[1]
    // console.log(drawingDateButton1.length)
    const drawingDateButton = screen.getByLabelText('Gift Drawing Date')
    const submitButton = screen.getByRole('button',{name: 'Create Group'})
    expect(drawingDateButton).toBeInTheDocument()
    // // console.log(drawingDateButton)
    await user.click(drawingDateButton) // need realTimers here
    const today = screen.getByText('15');
    await user.click(today)
    await user.click(submitButton)
    screen.debug(undefined, Infinity)
    // expect(errorMessage).toBeInTheDocument()
  })
  })})
