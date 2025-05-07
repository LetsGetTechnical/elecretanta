import { render, screen, act, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LoginButton from './LoginButton';
import { signInWithGoogle } from '@/lib/utils';
import * as React from 'react';

const mockSetIsLoading = jest.fn();

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

    it('When isLoading is true, the button is disabled and the loading spinner is displayed', () => {
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, mockSetIsLoading]);
        
        render(<LoginButton />);
        const loginButton = screen.getByTestId('login-button');
        expect(loginButton).toBeDisabled();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('When isLoading is false, the button is enabled and the Google icon is displayed', () => {
         jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, mockSetIsLoading]);
        
        render(<LoginButton />);
        const loginButton = screen.getByTestId('login-button');
        expect(loginButton).not.toBeDisabled();
        expect(screen.getByTestId('google-icon')).toBeInTheDocument();
    });

    it('The LoginButton should be focusable and clickable with keyboard', async () => {
        render(<LoginButton />);
        const loginButton = screen.getByTestId('login-button');
        loginButton.focus();
        
        await userEvent.keyboard('{enter}');
        
        expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
});















