"use client";

import { createClient } from "@/lib/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
  isSignedIn: boolean | null;
}>({
  user: null,
  session: null,
  isSignedIn: null,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const grabSession = async () => {
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

  const contextValue = useMemo(
    () => ({
      user,
      session,
      isSignedIn,
    }),
    [isSignedIn]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

// custom hook to access the authentication context
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used withing an AuthContextProvider"
    );
  }
  return context;
};

export { useAuthContext };
