import { render, screen } from '@testing-library/react';
import  FeedbackView  from './FeedbackView';

describe('FeedbackView', () => {
  it('should render', () => {
    render(<FeedbackView />);
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




