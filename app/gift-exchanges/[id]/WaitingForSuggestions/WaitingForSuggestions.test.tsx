import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { WaitingForSuggestions } from './WaitingForSuggestions';
import userEvent from '@testing-library/user-event';

describe('WaitingForSuggestions', () => {
  it('renders the component', () => {
    render(<WaitingForSuggestions />);

    const suggestionsWaiting = screen.getByTestId('suggestions-waiting');
    expect(suggestionsWaiting).toBeInTheDocument();
  });

  it('calls handleRefresh when the button is clicked', async () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        reload: reloadMock,
      },
      writable: true,
    });

    render(<WaitingForSuggestions />);

    const button = screen.getByTestId('check-button');

    userEvent.click(button);

    await waitFor(() => {
      expect(reloadMock).toHaveBeenCalled();
    });
  });
});
