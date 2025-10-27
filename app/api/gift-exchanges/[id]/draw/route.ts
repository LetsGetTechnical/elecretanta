import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { SupabaseError } from '@/lib/errors/CustomErrors';
import logError from '@/lib/errors/logError';

/**
 * API Route for drawing gift exchange names
 * POST /api/gift-exchanges/[id]/draw
 */

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const id = await params.id;

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

    await drawGiftExchange(supabase, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return logError(error);
  }
}
