// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

/**
 * Get user avatar URL
 * @returns {Promise<NextResponse>} Promise that resolved to a Response object
 */
export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError });
  }

  const avatarUrl = user?.user_metadata.avatar_url;

  return NextResponse.json({ avatarUrl });
}
