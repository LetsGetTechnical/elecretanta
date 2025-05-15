// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { createClient } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  JSX,
} from 'react';
import { IAuthContext } from './IAuthContext.interface';

const AuthContext = createContext<IAuthContext>({
  user: null,
  session: null,
  isSignedIn: null,
});

/**
 * Provides authentication context to the application.
 * @param {object} props - The component props.
 * @param {JSX.Element} props.children - The child components to render.
 * @returns {JSX.Element} The rendered component.
 */
const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setIsSignedIn(false);
        setUser(null);
      } else if (session) {
        setSession(session);
        setIsSignedIn(true);
        setUser(session.user);
      }
    });
    return (): void => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const contextValue = useMemo(
    () => ({
      user,
      session,
      isSignedIn,
    }),
    [isSignedIn, session, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

/**
 * Custom hook to access the authentication context.
 * @returns {IAuthContext} The authentication context.
 */
const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
};

export { useAuthContext };
