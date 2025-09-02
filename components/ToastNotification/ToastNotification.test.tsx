import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import { ToastVariants } from '@/components/ToastNotification/ToastNotification.enum';
import ToastNotification from './ToastNotification';

const allVariants = [
    ToastVariants.CountDown,
    ToastVariants.DrawingDay,
    ToastVariants.OverDue,
];

describe('Dashboard Toast Notifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the Countdown toast when the drawing date is 1-3 days away', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);

    const mockGiftExchanges = [{
      gift_exchange_id: '1',
      name: 'Test Group',
      drawing_date: futureDate,
      status: 'pending',
      member_count: 2,
    }];
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGiftExchanges),
    });

    render(<Dashboard />);

    const toastTitle = await screen.findByText('Drawing Date Countdown');
    const toastMessage = await screen.findByText('The draw is in 2 days!');

    expect(toastTitle).toBeInTheDocument();
    expect(toastMessage).toBeInTheDocument();
  });

  it('should display the Drawing Day toast when the drawing date is today', async () => {
    const today = new Date();
    
    const mockGiftExchanges = [{
      gift_exchange_id: '1',
      name: 'Today\'s Draw',
      drawing_date: today,
      status: 'pending',
      member_count: 3,
    }];
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGiftExchanges),
    });
    
    render(<Dashboard />);

    const toastTitle = await screen.findByText("It's Secret Santa Reveal Day!");
    const toastMessage = await screen.findByText('Go to your group to initiate the gift exchange draw.');

    expect(toastTitle).toBeInTheDocument();
    expect(toastMessage).toBeInTheDocument();
  });

  it('should display the Overdue toast when the drawing date has passed', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);

    const mockGiftExchanges = [{
      gift_exchange_id: '1',
      name: 'Overdue Group',
      drawing_date: pastDate,
      status: 'pending',
      member_count: 4,
    }];
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGiftExchanges),
    });
    
    render(<Dashboard />);

    const toastTitle = await screen.findByText('Drawing Date has passed.');
    const toastMessage = await screen.findByText('Your Secret Santas are still secret! Please draw now or reschedule drawing date.');

    expect(toastTitle).toBeInTheDocument();
    expect(toastMessage).toBeInTheDocument();
  });

  it('should not display a toast when the drawing date is more than 3 days away', async () => {
    const farFutureDate = new Date();
    farFutureDate.setDate(farFutureDate.getDate() + 5);
    
    const mockGiftExchanges = [{
      gift_exchange_id: '1',
      name: 'Far Future Group',
      drawing_date: farFutureDate,
      status: 'pending',
      member_count: 5,
    }];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGiftExchanges),
    });

    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.queryByText('Drawing Date Countdown')).not.toBeInTheDocument();
      expect(screen.queryByText("It's Secret Santa Reveal Day!")).not.toBeInTheDocument();
      expect(screen.queryByText('Drawing Date has passed.')).not.toBeInTheDocument();
    });
  });

  it(`should render the dismiss button for a variant`, () => {
    render(<ToastNotification variant = {ToastVariants.CountDown} message = 'Test Message' />)

    const dismissButton = screen.getByTestId('dismiss-button');
    expect(dismissButton).toBeInTheDocument();
  })

  it('should remove the toast when the dismiss button is clicked', () => {
    render(<ToastNotification variant = {ToastVariants.CountDown} message = 'Test Message' />)

    const dismissButton = screen.getByTestId('dismiss-button');
    fireEvent.click(dismissButton);
    expect(dismissButton).not.toBeInTheDocument();
  })
});