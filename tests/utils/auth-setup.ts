// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { createClient } from '@supabase/supabase-js';
import { Page } from '@playwright/test';

/**
 * Get a Supabase client with authentication set up for Playwright tests
 * @param page - The Playwright page object
 * @param userEmail - The email of the user to sign in as
 * @param path - The path to navigate to after signing in
 * @returns Promise that resolves when authentication is set up
 */
async function getSupabaseClient(
  page: Page,
  userEmail: string,
  path = '/',
): Promise<void> {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: userEmail,
    password: 'password',
  });
  if (!data.user) {
    throw Error(error?.message);
  }

  const projectRef = process.env
    .NEXT_PUBLIC_SUPABASE_URL!.split('//')[1]
    .split('.')[0];
  await page.context().addCookies([
    {
      name: `sb-${projectRef}-auth-token`,
      value: JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      }),
      domain: 'localhost',
      path: path,
      httpOnly: false,
      secure: false,
    },
  ]);
}

export { getSupabaseClient };
