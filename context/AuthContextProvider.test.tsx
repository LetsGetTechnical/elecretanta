import { render, screen, act, cleanup } from '@testing-library/react';
import AuthContextProvider, { useAuthContext } from './AuthContextProvider';

const mockUnsubscribe = jest.fn();
let authStateChangeCallback: (event: string, session: any) => void;

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      onAuthStateChange: jest.fn((cb: any) => {
        authStateChangeCallback = cb;
        return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
      }),
    },
  })),
}));

const TestConsumer = () => {
  const { user, session, isSignedIn } = useAuthContext();
  return (
    <>
      <div data-testid="user">{JSON.stringify(user)}</div>
      <div data-testid="session">{JSON.stringify(session)}</div>
      <div data-testid="isSignedIn">{String(isSignedIn)}</div>
    </>
  );
};

const TestComponent = () => (
  <AuthContextProvider>
    <TestConsumer />
  </AuthContextProvider>
);

describe('AuthContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should have null values for user, session, and isSignedIn by default', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('session')).toHaveTextContent('null');
    expect(screen.getByTestId('isSignedIn')).toHaveTextContent('null');
  });

  it('should update values when SIGNED_IN event is emitted', () => {
    const fakeUser = { id: '123', email: 'test@example.com' };
    const fakeSession = { user: fakeUser };

    render(<TestComponent />);

    act(() => {
      authStateChangeCallback('SIGNED_IN', fakeSession);
    });

    expect(screen.getByTestId('user')).toHaveTextContent(
      JSON.stringify(fakeUser),
    );
    expect(screen.getByTestId('session')).toHaveTextContent(
      JSON.stringify(fakeSession),
    );
    expect(screen.getByTestId('isSignedIn')).toHaveTextContent('true');
  });

  it('should clear values when SIGNED_OUT event is emitted', () => {
    const fakeUser = { id: '123', email: 'test@example.com' };
    const fakeSession = { user: fakeUser };

    render(<TestComponent />);

    act(() => {
      authStateChangeCallback('SIGNED_IN', fakeSession);
    });

    act(() => {
      authStateChangeCallback('SIGNED_OUT', null);
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('session')).toHaveTextContent('null');
    expect(screen.getByTestId('isSignedIn')).toHaveTextContent('false');
  });

  it('should unsubscribe from auth state changes on unmount', () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('should have default values when useAuthContext is used outside of AuthContextProvider', () => {
    render(<TestConsumer />);
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('session')).toHaveTextContent('null');
    expect(screen.getByTestId('isSignedIn')).toHaveTextContent('null');
  });
});
