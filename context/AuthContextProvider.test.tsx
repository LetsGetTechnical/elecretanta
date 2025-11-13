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
  const mockPush = jest.fn();
  const validUser = { user: { id: '123' } };
  const mockGetUser = jest.fn().mockResolvedValue({
    data: validUser,
  });
  const validSession = { session: validUser };
  const mockGetValidSession = jest.fn().mockResolvedValue({
    data: validSession,
  });
  const noSession = { session: null };
  const mockGetNoSession = jest.fn().mockResolvedValue({
    data: noSession,
  });
  const mockSignOut = jest.fn().mockResolvedValue({ error: null });

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const TestComponent = () => {
    const { logOut, isSignedIn } = useAuthContext();

    return (
      <div>
        <div data-testid="login-state">{String(isSignedIn)}</div>
        <button data-testid="logout-button" onClick={logOut}>
          Logout
        </button>
      </div>
    );
  };

  it('should log user out and redirect to home page', async () => {
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: mockSignOut,
        getSession: mockGetValidSession,
        getUser: mockGetUser,
      },
    });

    render(
      <AuthContextProvider>
        <TestComponent />
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

  it('should set state variable isSignedIn to true if supabase.auth.getSession returns a valid session', async () => {
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        getSession: mockGetValidSession,
        getUser: mockGetUser,
      },
    });

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>,
    );

    const loginState = screen.getByTestId('login-state');

    expect(loginState).toHaveTextContent(/null/i);

    await waitFor(() => {
      expect(loginState).toHaveTextContent(/true/i);
    });
  });

  it('should set state variable isSignedIn to false if supabase.auth.getSession does not return a valid session', async () => {
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        getSession: mockGetNoSession,
      },
    });

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>,
    );

    const loginState = screen.getByTestId('login-state');

    expect(loginState).toHaveTextContent(/null/i);

    await waitFor(() => {
      expect(loginState).toHaveTextContent(/false/i);
    });
  });
});
