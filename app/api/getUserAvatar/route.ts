import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function GET() {
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
