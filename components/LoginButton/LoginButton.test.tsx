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
        render(<LoginButton />);
        const loginButton = screen.getByTestId('login-button');
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).not.toBeDisabled();
        expect(loginButton.querySelector('[data-testid="google-icon"]')).toBeInTheDocument();
        expect(loginButton).toHaveTextContent('Continue with Google');
    });
     
     
     it('When loginButton is clicked it is disabled, it displays the loading spinner, and signInWithGoogle is called', async () => {
          // let resolveSignIn: () => void;
          // const signInPromise = new Promise<void>(resolve => {
          //      resolveSignIn = resolve;
          // });
          (signInWithGoogle as jest.Mock).mockImplementation(
            () => new Promise(() => {}),
           );
          render(<LoginButton />);
          const loginButton = screen.getByTestId('login-button');
          
          await userEvent.click(loginButton);
          
          expect(loginButton).toBeDisabled();
          expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
          expect(signInWithGoogle).toHaveBeenCalledTimes(1);
     })
     
    it('If signInWithGoogle throws an error, the LoginButton is re-enabled', async () => {
    const error = new Error('Sign in failed');
    mockSignInWithGoogle.mockRejectedValueOnce(error);

    const { getByTestId } = render(<LoginButton />);
    const loginButton = getByTestId('login-button'); // Ensures the `<button>` is rendered

    await userEvent.click(loginButton);

    await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
    });

    expect(mockSignInWithGoogle).toHaveBeenCalledTimes(1);
    expect(getByTestId('google-icon')).toBeInTheDocument();
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