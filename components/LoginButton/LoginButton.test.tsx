import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LoginButton from './LoginButton';
import { signInWithGoogle } from '@/lib/utils';

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  signInWithGoogle: jest.fn(),
}));

const mockSignInWithGoogle = signInWithGoogle as jest.Mock;

describe('LoginButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

     it('On initial load the button is not disabled and displays the google icon and the text Continue with Google', () => {
        const { getByTestId } = render(<LoginButton />);
        const loginButton = getByTestId('login-button');
        const googleIcon = getByTestId('google-icon');

        expect(loginButton).toBeInTheDocument();
        expect(loginButton).not.toBeDisabled();
        expect(googleIcon).toBeInTheDocument();
        expect(loginButton).toHaveTextContent('Continue with Google');
    });
     
     
     it('When loginButton is clicked it is disabled, it displays the loading spinner, and signInWithGoogle is called', async () => {
          (signInWithGoogle as jest.Mock).mockImplementation(
            () => new Promise(() => {}),
           );
          render(<LoginButton />);
          const loginButton = screen.getByTestId('login-button');
          
          await userEvent.click(loginButton);
          
          const loadingSpinner = screen.getByTestId('loading-spinner');
          expect(loginButton).toBeDisabled();
          expect(loadingSpinner).toBeInTheDocument();
          expect(signInWithGoogle).toHaveBeenCalledTimes(1);
     })
     
    it('If signInWithGoogle throws an error, the LoginButton is re-enabled', async () => {
    const error = new Error('Sign in failed');
    mockSignInWithGoogle.mockRejectedValueOnce(error);

    const { getByTestId } = render(<LoginButton />);
    const loginButton = getByTestId('login-button');
    
    await userEvent.click(loginButton);
    
    const googleIcon = getByTestId('google-icon');
    await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
    });

    expect(mockSignInWithGoogle).toHaveBeenCalledTimes(1);
    expect(googleIcon).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('Continue with Google');
    });

    it('The LoginButton should be focusable and clickable with keyboard', async () => {
        render(<LoginButton />);
        const loginButton = screen.getByTestId('login-button');
        loginButton.focus();
        
        await userEvent.keyboard('{enter}');
        expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
});