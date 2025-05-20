// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for client-side functionality.
 * @returns {SupabaseClient} Supabase client for use in browser.
 */
export function createClient(): SupabaseClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
