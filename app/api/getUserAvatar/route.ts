// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';

/**
 * Get user avatar URL
 * @returns {Promise<AuthError | NextResponse<unknown>>} Promise that resolved to a Response object
 */
export async function GET(): Promise<AuthError | NextResponse<unknown>> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return userError;
  }

  const avatarUrl = user?.user_metadata.avatar_url;

  return NextResponse.json({ avatarUrl });
}
