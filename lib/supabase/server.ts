// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { CookieOptions, createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

/**
 * Creates a Supabase client for server-side functionality.
 * @returns {Promise<SupabaseClient>} Promise that resolves to the Supabase client.
 */
export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Gets all cookies.
         * @returns {Promise<RequestCookie[]>} Promise that resolves to an array of cookies.
         */
        getAll(): RequestCookie[] {
          return cookieStore.getAll();
        },
        /**
         * Sets multiple cookies.
         * @param {Array<{name: string, value: string, options: CookieOptions}>} cookiesToSet - An array of cookies to set.
         * @returns {void}
         */
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options: CookieOptions;
          }>,
        ): void {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
