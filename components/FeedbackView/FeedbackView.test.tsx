import { render, screen, waitFor } from '@testing-library/react';
import { GiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';
import FeedbackView from './FeedbackView';

// Mock the generateAndUpdateNewGiftSuggestion function
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

  const renderFeedbackView = () => {
    return render(
      <div data-testid="feedback-view">
        <FeedbackView
          allGiftSuggestions={[]}
          budget={''}
          gift={mockGiftSuggestion}
          handleFeedback={() => {}}
          onGiftUpdate={() => {}}
          recipient={mockProfile}
        />
      </div>
    );
  };

  it('should render', () => {
    renderFeedbackView();
    expect(screen.getByTestId('feedback-view')).toBeInTheDocument();
  });

  describe('Loading State', () => {
    it('should show loading spinner and hide buttons when isLoading is true', async () => {
      renderFeedbackView();

      // Initially, loading spinner should not be visible
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      
      // Buttons should be visible
      const expensiveButton = screen.getByTestId('feedback-button-0');
      const styleButton = screen.getByTestId('feedback-button-1');
      const haveButton = screen.getByTestId('feedback-button-2');

      expect(expensiveButton).toBeInTheDocument();
      expect(styleButton).toBeInTheDocument();
      expect(haveButton).toBeInTheDocument();

      // Simulate loading state by clicking a button
      expensiveButton.click();

      // Wait for loading state to change
      await waitFor(() => {
        // After clicking, loading spinner should be visible
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        
        // Buttons should not be visible
        expect(screen.queryByTestId('feedback-button-0')).not.toBeInTheDocument();
        expect(screen.queryByTestId('feedback-button-1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('feedback-button-2')).not.toBeInTheDocument();
      });
    });

    it('should show buttons and hide loading spinner when isLoading is false', () => {
      renderFeedbackView();

      // Initially, loading spinner should not be visible
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      
      // Buttons should be visible
      const expensiveButton = screen.getByTestId('feedback-button-0');
      const styleButton = screen.getByTestId('feedback-button-1');
      const haveButton = screen.getByTestId('feedback-button-2');

      expect(expensiveButton).toBeInTheDocument();
      expect(styleButton).toBeInTheDocument();
      expect(haveButton).toBeInTheDocument();

      // Feedback title and chevron should be visible
      expect(screen.getByTestId('feedback-title')).toBeInTheDocument();
      expect(screen.getByTestId('back-chevron')).toBeInTheDocument();
    });
  });

  describe('Button Click Behavior', () => {
    it('should call handleFeedbackSubmit with correct argument when button is clicked', async () => {
      const mockOnGiftUpdate = jest.fn();
      render(
        <div data-testid="feedback-view">
          <FeedbackView
            allGiftSuggestions={[]}
            budget={''}
            gift={mockGiftSuggestion}
            handleFeedback={() => {}}
            onGiftUpdate={mockOnGiftUpdate}
            recipient={mockProfile}
          />
        </div>
      );

      const expensiveButton = screen.getByTestId('feedback-button-0');
      expensiveButton.click();

      await waitFor(() => {
        expect(mockOnGiftUpdate).toHaveBeenCalledWith(expect.objectContaining({
          id: '1',
          title: 'New Test Gift',
          price: '50',
          description: 'New Test Description',
          matchReasons: ['new test reason'],
          matchScore: 0.9,
          imageUrl: 'new-test.jpg',
        }));
      });
    });

    it('should transition loading state correctly during button click', async () => {
      renderFeedbackView();

      const expensiveButton = screen.getByTestId('feedback-button-0');
      
      // Initial state - no loading spinner, buttons visible
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByTestId('feedback-button-0')).toBeInTheDocument();

      expensiveButton.click();

      // Loading state - spinner visible, buttons hidden
      await waitFor(() => {
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('feedback-button-0')).not.toBeInTheDocument();
      });

      // Final state - spinner hidden, buttons visible again
      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('feedback-button-0')).toBeInTheDocument();
      });
    });
  });

  describe('Button Content and Layout', () => {
    it('should render each button with correct title and subtitle', () => {
      renderFeedbackView();

      const buttonVariants = [
        { title: 'Too Expensive', subtitle: 'Show lower price range' },
        { title: 'Not Their Style', subtitle: 'Try different interests' },
        { title: 'They Might Have This', subtitle: 'Show alternatives' },
      ];

      buttonVariants.forEach(({ title, subtitle }) => {
        const button = screen.getByText(title).closest('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(subtitle);
      });
    });

    it('should maintain vertical alignment (matching x-coordinates) of buttons', () => {
      renderFeedbackView();

      const buttons = [
        screen.getByText('Too Expensive').closest('button'),
        screen.getByText('Not Their Style').closest('button'),
        screen.getByText('They Might Have This').closest('button'),
      ];

      // Get the x-coordinates of all buttons
      const buttonPositions = buttons.map(button => {
        if (!button) return null;
        const rect = button.getBoundingClientRect();
        return rect.left;
      });

      // Check if all buttons have the same x-coordinate
      const firstX = buttonPositions[0];
      expect(buttonPositions.every(x => x === firstX)).toBe(true);
    });
  });

  describe('Gift Update Behavior', () => {
    it('should call onGiftUpdate with new gift when button is clicked', async () => {
      const mockOnGiftUpdate = jest.fn();
      render(
        <div data-testid="feedback-view">
          <FeedbackView
            allGiftSuggestions={[]}
            budget={''}
            gift={mockGiftSuggestion}
            handleFeedback={() => {}}
            onGiftUpdate={mockOnGiftUpdate}
            recipient={mockProfile}
          />
        </div>
      );

      const expensiveButton = screen.getByTestId('feedback-button-0');
      expensiveButton.click();

      await waitFor(() => {
        expect(mockOnGiftUpdate).toHaveBeenCalledWith(expect.objectContaining({
          id: '1',
          title: 'New Test Gift',
          price: '50',
          description: 'New Test Description',
          matchReasons: ['new test reason'],
          matchScore: 0.9,
          imageUrl: 'new-test.jpg',
        }));
      });
    });
  });
});


  // Loading State Tests:
  // - Test loading state visibility (spinner vs buttons)
  // - Test loading state transitions
  // - Test mutual exclusivity of spinner and buttons

  // Button Click Behavior Tests:
  // - Test handleFeedbackSubmit function calls
  // - Test correct argument passing
  // - Test loading state changes during button clicks

  // Button Content Tests:
  // - Test presence of title and subtitle
  // - Test correct buttonVariants array mapping
  // - Test completeness of button set

  // Layout Tests:
  // - Test vertical alignment of flexCol items
  // - Test vertical alignment of buttons

  // Gift Update Tests:
  // - Test onGiftUpdate function calls
  // - Test updatedGift initialization and changes




// My original list of tests:

  // if isLoading is true, no buttons should be rendered and loading spinner should be rendered
  // if isLoading is false, 3 buttons should be rendered and "Give Us Feedback" and the Chevron should be rendered 
  // when a button is clicked, the handleFeedbackSubmit function should be called with the correct argument
  // when a button is clicked, isLoading should switch to true (it may take a second though) and then back to false after it loads.
  // each button should have a title and a subtitle 
  // each title and corresponding subtitle should be from the same index in the buttonVariants array
  // there should exist a button with each title and subtitle. 
  // the loading spinner and buttons should never be rendered at the same time
  // the items in a flexCol container should have matching starting x values (be vertically aligned)
  // the 3 buttons should have matching starting x values (be vertically aligned)
  // if the user clicks one of the buttons, onGiftUpdate should be called
  // if the user clicks one of the buttons, updatedGift should be initialized and not equal to gift.

