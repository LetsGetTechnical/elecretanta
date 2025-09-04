import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAuthContext } from '@/context/AuthContextProvider';
import AuthContextProvider from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthContextProvider', () => {
  it('should log user out and redirect to home page', async () => {
    const mockSignOut = jest.fn().mockResolvedValue({ error: null });
    const mockGetSession = jest.fn().mockResolvedValue({
      data: { session: { user: { id: '123' } } },
    });
    const mockGetUser = jest.fn().mockResolvedValue({
      data: { user: { id: '123' } },
    });
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: mockSignOut,
        getSession: mockGetSession,
        getUser: mockGetUser,
      },
    });

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const TestLogoutButton = () => {
      const { logOut, isSignedIn } = useAuthContext();

      return (
        <div>
          <div data-testid="login-state">{isSignedIn ? 'true' : 'false'}</div>
          <button data-testid="logout-button" onClick={logOut}>
            Logout
          </button>
        </div>
      );
    };

    render(
      <AuthContextProvider>
        <TestLogoutButton />
      </AuthContextProvider>,
    );

    const logoutButton = screen.getByTestId('logout-button');
    const loginState = screen.getByTestId('login-state');

    expect(logoutButton).toBeInTheDocument();
    expect(loginState).toBeInTheDocument();

    // Login state needs to wait for the state to be set
    await waitFor(() => {
      expect(loginState).toHaveTextContent('true');
    });

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(loginState).toHaveTextContent('false');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
