import { render, screen } from '@testing-library/react';
import { GiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';
import FeedbackView from './FeedbackView';

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

  it('should render', () => {
    render(
      <FeedbackView
        allGiftSuggestions={[]}
        budget={''}
        gift={mockGiftSuggestion}
        handleFeedback={() => {}}
        onGiftUpdate={() => {}}
        recipient={null}
      />
    );
  });

  describe('Loading State', () => {
    it('should show loading spinner and hide buttons when isLoading is true', () => {
      const { rerender } = render(
        <FeedbackView
          allGiftSuggestions={[]}
          budget={''}
          gift={mockGiftSuggestion}
          handleFeedback={() => {}}
          onGiftUpdate={() => {}}
          recipient={mockProfile}
        />
      );

      // Initially, loading spinner should not be visible
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      
      // Buttons should be visible
      expect(screen.getByText('Too Expensive')).toBeInTheDocument();
      expect(screen.getByText('Not Their Style')).toBeInTheDocument();
      expect(screen.getByText('They Might Have This')).toBeInTheDocument();

      // Simulate loading state by clicking a button
      const button = screen.getByText('Too Expensive').closest('button');
      if (button) {
        button.click();
      }

      // After clicking, loading spinner should be visible
      expect(screen.getByRole('status')).toBeInTheDocument();
      
      // Buttons should not be visible
      expect(screen.queryByText('Too Expensive')).not.toBeInTheDocument();
      expect(screen.queryByText('Not Their Style')).not.toBeInTheDocument();
      expect(screen.queryByText('They Might Have This')).not.toBeInTheDocument();
    });

    it('should show buttons and hide loading spinner when isLoading is false', () => {
      render(
        <FeedbackView
          allGiftSuggestions={[]}
          budget={''}
          gift={mockGiftSuggestion}
          handleFeedback={() => {}}
          onGiftUpdate={() => {}}
          recipient={mockProfile}
        />
      );

      // Initially, loading spinner should not be visible
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      
      // Buttons should be visible
      expect(screen.getByText('Too Expensive')).toBeInTheDocument();
      expect(screen.getByText('Not Their Style')).toBeInTheDocument();
      expect(screen.getByText('They Might Have This')).toBeInTheDocument();
    });
  });

  // if isLoading is true, no buttons should be rendered and loading spinner should be rendered
  // if isLoading is false, 3 buttons should be rendered and "Give Us Feedback" and the Chevron should be rendered 
  // when a button is clicked, the handleFeedbackSubmit function should be called
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

  // Organized Test Groups:

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
});




