import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { createClient } from "@/lib/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateGroupExchangeDates = (
  drawingDate: Date,
  exchangeDate: Date
): string | null => {
  if (drawingDate >= exchangeDate) {
    return "Drawing date must be before exchange date";
  }
  return null;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const signInWithGoogle = async (options?: { redirectPath?: string }) => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: options?.redirectPath
          ? `${window.location.origin}/auth/callback?redirect_to=${options.redirectPath}`
          : `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      redirect("/auth/error");
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
    redirect("/auth/error");
  }
};
