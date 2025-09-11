// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { createClient } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  FC,
} from 'react';

/**
 * Logs the user out of their account.
 */
const logOut: () => void = () => {};

const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
  isSignedIn: boolean | null;
  logOut: () => void;
}>({
  user: null,
  session: null,
  isSignedIn: null,
  logOut,
});

/**
 * The AuthContextProvider wraps a given set of children with the AuthContext,
 * which provides information about the current user and session, as well as a
 * method to log the user out of the application.
 *
 * When the component mounts, it will attempt to fetch the current session from
 * Supabase and store it in state, as well as the associated user. If the session
 * is valid, it will also set the `isSignedIn` state to true.
 *
 * If there is an error, it will rethrow the error.
 * @param {ReactNode} children The children to wrap with the AuthContext.
 * @returns The wrapped children and the AuthContext.
 */
const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    /**
     * Fetches the current session from Supabase and stores it in state,
     * as well as the associated user.
     */
    const grabSession = async (): Promise<void> => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          setUser(user);
          setIsSignedIn(true);
        }
      } catch (error) {
        throw error;
      }
    };

    grabSession();
  }, [supabase]);

  /**
   * Signs the user out of the application, invalidating the session and
   * removing any associated user data from state.
   *
   * If there is an error with the sign out process, it will throw the error.
   * @returns A promise that resolves when the sign out process is complete.
   */
  const logOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    } else {
      setIsSignedIn(false);
      router.push('/');
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      session,
      isSignedIn,
      logOut,
    }),
    [isSignedIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

/**
 * Custom hook to access the authentication context.
 * @returns An object with the current user, session, sign in state, and log out function.
 * @throws {Error} If used outside of an `AuthContextProvider`.
 */
const useAuthContext = (): {
  user: User | null;
  session: Session | null;
  isSignedIn: boolean | null;
  logOut: () => void;
} => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
};

export { useAuthContext };
