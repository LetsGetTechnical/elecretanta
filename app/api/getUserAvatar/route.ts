// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';
import { SupabaseError } from '@/lib/errors/CustomErrors';
import { BackendError } from '@/lib/errors/CustomErrors';

/**
 * Get user avatar URL
 * @returns {Promise<NextResponse>} Promise that resolved to a Response object
 */
export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      const statusCode = userError.status || 500;
      throw new SupabaseError('Failed to fetch user', statusCode, userError);
    }

    if (!user) {
      throw new SupabaseError('User is not authenticated or exists', 500);
    }

    if (!user.user_metadata.avatar_url) {
      console.error('User has no avatar');

      throw new BackendError('User has no avatar', 500);
    }

    const avatarUrl = user.user_metadata.avatar_url;

    return NextResponse.json({ avatarUrl });
  } catch (error) {
    if (error instanceof SupabaseError) {
      console.error('Supabase error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    } else if (error instanceof BackendError) {
      console.error('Backend error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    console.error('Unexpected error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
