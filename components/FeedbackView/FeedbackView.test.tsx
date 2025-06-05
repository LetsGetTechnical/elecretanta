import { render, screen, waitFor, act } from '@testing-library/react';
import { GiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';
import FeedbackView from './FeedbackView';
import userEvent from '@testing-library/user-event';
import { generateAndUpdateNewGiftSuggestion } from '@/lib/generateAndUpdateNewGiftSuggestion';

jest.mock('@/lib/generateAndUpdateNewGiftSuggestion', () => ({
  generateAndUpdateNewGiftSuggestion: jest.fn().mockResolvedValue({
    id: '1',
    title: 'New Test Gift',
    price: '50',
    description: 'New Test Description',
    matchReasons: ['new test reason'],
    matchScore: 0.9,
    imageUrl: 'new-test.jpg',
  }),
}));

describe('FeedbackView', () => {
  const mockGiftSuggestion: GiftSuggestion = {
    id: '1',
    title: 'Test Gift',
    price: '100',
    description: 'Test Description',
    matchReasons: ['test reason'],
    matchScore: 0.8,
    imageUrl: 'test.jpg',
  };

  const mockProfile: Profile = {
    id: '1',
    display_name: 'Test User',
    email: 'test@example.com',
    categories: ['test'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    onboarding_complete: true,
  };

  const mockHandleFeedback = jest.fn();
  const mockOnGiftUpdate = jest.fn();

  const renderFeedbackView = () => {
    return render(
      <FeedbackView
        allGiftSuggestions={[]}
        budget={''}
        gift={mockGiftSuggestion}
        handleFeedback={mockHandleFeedback}
        onGiftUpdate={mockOnGiftUpdate}
        recipient={mockProfile}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the feedback interface', () => {
    renderFeedbackView();
    expect(screen.getByTestId('feedback-view')).toBeInTheDocument();
  });

  it('On initial load, the loading spinner is hidden and the buttons are visible', () => {
    renderFeedbackView();

    expect(
      screen.queryByTestId('feedback-view--loading'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('button-group')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-view--loaded')).toBeInTheDocument();
  });

  it('When button is clicked, handleFeedbackSubmit should be called with correct argument', async () => {
    renderFeedbackView();

    const expensiveButton = screen.getByTestId('expensive');

    await userEvent.click(expensiveButton);

    await waitFor(() => {
      expect(mockOnGiftUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          title: 'New Test Gift',
          price: '50',
          description: 'New Test Description',
          matchReasons: ['new test reason'],
          matchScore: 0.9,
          imageUrl: 'new-test.jpg',
        }),
      );
    });
  });

  it('When button is clicked, loading spinner appears and buttons are hidden, then loading spinner disappears and buttons are shown again', async () => {
    renderFeedbackView();

    const expensiveButton = screen.getByTestId('expensive');

    expect(
      screen.queryByTestId('feedback-view--loading'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('button-group')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(expensiveButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('feedback-view--loading')).toBeInTheDocument();
      expect(screen.queryByTestId('button-group')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('feedback-view--loading'),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('button-group')).toBeInTheDocument();
    });
  });

  it('When button is clicked, onGiftUpdate is called with new gift', async () => {
    renderFeedbackView();

    const expensiveButton = screen.getByTestId('expensive');
    await act(async () => {
      userEvent.click(expensiveButton);
    });

    await waitFor(() => {
      expect(mockOnGiftUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          title: 'New Test Gift',
          price: '50',
          description: 'New Test Description',
          matchReasons: ['new test reason'],
          matchScore: 0.9,
          imageUrl: 'new-test.jpg',
        }),
      );
    });
  });

  it('If updatedGift is null, an error should be logged and onGiftUpdate is not called.', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockOnGiftUpdate = jest.fn();
    (generateAndUpdateNewGiftSuggestion as jest.Mock).mockResolvedValue(null);

    render(
      <FeedbackView
        allGiftSuggestions={[]}
        budget={''}
        gift={mockGiftSuggestion}
        handleFeedback={mockHandleFeedback}
        onGiftUpdate={mockOnGiftUpdate}
        recipient={mockProfile}
      />,
    );

    const expensiveButton = screen.getByTestId('expensive');
    await act(async () => {
      userEvent.click(expensiveButton);
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to update gift suggestion',
      );
    });

    consoleErrorSpy.mockRestore();

    expect(mockOnGiftUpdate).not.toHaveBeenCalled();
  });

  it('When onGiftUpdate fails, an error is thrown', async () => {
    const mockOnGiftUpdate = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('Update error'));
    });

    render(
      <FeedbackView
        allGiftSuggestions={[]}
        budget={''}
        gift={mockGiftSuggestion}
        handleFeedback={mockHandleFeedback}
        onGiftUpdate={mockOnGiftUpdate}
        recipient={mockProfile}
      />,
    );

    const alternativeButton = screen.getByTestId('alternative');

    await expect(
      act(async () => {
        await userEvent.click(alternativeButton);
      }),
    ).rejects.toThrow('Update error');
  });
});
