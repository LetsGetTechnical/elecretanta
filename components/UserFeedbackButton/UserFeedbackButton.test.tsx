import UserFeedbackButton from './UserFeedbackButton';
import { render, screen } from '@testing-library/react';

describe('UserFeedbackButton', () => {
  it('renders the user feedback button with correct link', () => {
    const urlToFeedbackForm = 'https://forms.gle/1rUskWou62FopGTXA';

    render(<UserFeedbackButton />);
    const link = screen.getByTestId('user-feedback-button');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', urlToFeedbackForm);
  });
});
