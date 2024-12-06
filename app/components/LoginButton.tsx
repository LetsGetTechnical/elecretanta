"use client";

import { createClient } from "@/lib/utils/supabase/client";

export default function LoginButton({ redirectPath = "/onboarding" }) {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    debugger;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          redirect_to: redirectPath,
        },
      },
    });

    if (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      Sign in with Google
    </button>
  );
}
