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

    // Fetch updated members (now with recipient assignments)
    const { data: membersData, error: membersError } = await supabase
      .from('gift_exchange_members')
      .select(`
        id,
        gift_exchange_id,
        user_id,
        recipient_id,
        has_drawn,
        created_at,
        updated_at,
        member:profiles!user_id (
          id,
          display_name,
          email,
          avatar
        ),
        recipient:profiles!recipient_id (
          id,
          display_name,
          email,
          avatar
        )
      `)
      .eq('gift_exchange_id', id);

    if (membersError) {
      console.error('membersError detail:', membersError);
      throw new SupabaseError(
        'Failed to fetch updated members',
        membersError.code,
        membersError,
      );
    }

    // Fetch gift suggestions
    const { data: suggestionsData, error: suggestionsError } = await supabase
      .from('gift_suggestions')
      .select('*')
      .eq('gift_exchange_id', id);

    if (suggestionsError) {
      console.error('membersError detail:', membersError);
      throw new SupabaseError(
        'Failed to fetch updated members',
        suggestionsError.code,
        suggestionsError,
      );
    }

    return NextResponse.json({
      members: membersData,
      suggestions: suggestionsData
    });

  } catch (error) {
    return logError(error);
  }
}
