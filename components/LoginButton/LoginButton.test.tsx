import { render, screen, act, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LoginButton from './LoginButton';
import { signInWithGoogle } from '@/lib/utils';


jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  signInWithGoogle: jest.fn(),
}));

const mockSignInWithGoogle = signInWithGoogle as jest.Mock;


describe('LoginButton', () => {
     it('Renders the LoginButton', () => {
          render(<LoginButton />);
          expect(screen.getByTestId('login-button')).toBeInTheDocument();
     })
     describe('On initial load', () => {
          it('the button is not disabled and it displays the google icon, the text "Google"', () => {
               render(<LoginButton />);
               const loginButton = screen.getByTestId('login-button');
               expect(loginButton).not.toBeDisabled();
               expect(loginButton.querySelector('[data-testid="google-icon"]')).toBeInTheDocument();
               expect(loginButton).toHaveTextContent('Google');
          })
     })
     describe('When loginButton is clicked', () => {
          it('it displays the loading spinner, is disabled, and signInWithGoogle is called', async () => {
               // Create a promise that we can resolve manually
               let resolveSignIn: () => void;
               const signInPromise = new Promise<void>(resolve => {
                    resolveSignIn = resolve;
               });
               (signInWithGoogle as jest.Mock).mockReturnValue(signInPromise);

               render(<LoginButton />);
               const loginButton = screen.getByTestId('login-button');
               
               await act(async () => {
                    await userEvent.click(loginButton);
               }); 

               // Check loading state immediately after click
               expect(loginButton).toBeDisabled();
               expect(loginButton.querySelector('svg[class*="animate-spin"]')).toBeInTheDocument();
               expect(signInWithGoogle).toHaveBeenCalled();

               // Now resolve the promise to complete the sign-in
               await act(async () => {
                    resolveSignIn();
               });
          })
     })
     describe('If signInWithGoogle throws an error', () => {
          it('isLoading is set to false, and the button is enabled', async () => {
               const error = new Error('Sign in failed');
               mockSignInWithGoogle.mockRejectedValueOnce(error);

               render(<LoginButton />);
               const loginButton = screen.getByTestId('login-button');
               
               await act(async () => {
                    await userEvent.click(loginButton);
               });

               expect(loginButton).not.toBeDisabled();
          })
     })
     describe('Buttons should be focusable and clickable with keyboard', () => {
          it('should be focusable and clickable with keyboard', async () => {
               render(<LoginButton />);
               const loginButton = screen.getByTestId('login-button');
               loginButton.focus();
               await act(async () => {
                    await userEvent.keyboard('{enter}');
               });
               expect(mockSignInWithGoogle).toHaveBeenCalled();
          })
     })
     describe('On hover', () => {
          it('the button should have a different background color', async () => {
               render(<LoginButton />);
               const loginButton = screen.getByTestId('login-button');
               expect(loginButton).toHaveClass('bg-primaryButtonYellow');
               expect(loginButton).toHaveClass('hover:bg-primaryButtonYellow/70');
          })
     })
})


// When isLoading is false
//  - button displays G svg and text "Continue with Google"
//  - button is not disabled


// When button is clicked:
//  - isLoading is set to true
//  - button displays loading spinner
//  - button is disabled
// - signIn function is called

// When isLoading is true
//  - button displays loading spinner
//  - button is disabled


// When signIn function is called
//  - isLoading is set to true
//  - button displays loading spinner
//  - button is disabled
//  - eventually isLoading is set to false


// If signInWithGoogle throws an error
//  - error is logged to console
//  - isLoading is set to false

// If signInWithGoogle resolves successfully
//  - isLoading is then set to false

// Button can be focused and clicked with keyboard 
// Button hover background color is different from default background color














