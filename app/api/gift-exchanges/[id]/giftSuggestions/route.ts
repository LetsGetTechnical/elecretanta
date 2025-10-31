import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { SupabaseError } from '@/lib/errors/CustomErrors';
import logError from '@/lib/errors/logError';

export async function GET(
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

    // Get match with full profile info
    const { data: match, error: matchError } = await supabase
      .from('gift_exchange_members')
      .select(
        `
        id,
        recipient_id,
        recipient:profiles!gift_exchange_members_recipient_id_profiles_fkey (
          id,
          display_name,
          age_group,
          categories,
          hobbies,
          avoid,
          practical_whimsical,
          cozy_adventurous,
          minimal_luxurious,
          email,
          avatar
        )
      `,
      )
      .eq('gift_exchange_id', id)
      .eq('user_id', user.id)
      .single();

    if (matchError) {
      throw new SupabaseError(
        'Failed to fetch match',
        matchError.code,
        matchError,
      );
    }

    // Get suggestions
    const { data: suggestions, error: suggestionsError } = await supabase
      .from('gift_suggestions')
      .select('*')
      .eq('gift_exchange_id', id)
      .eq('giver_id', user.id);

    if (suggestionsError) {
      throw new SupabaseError(
        'Failed to fetch suggestions',
        suggestionsError.code,
        suggestionsError,
      );
    }

    return NextResponse.json({
      match: match.recipient,
      suggestions: suggestions.map((s) => ({
        ...s.suggestion,
        id: s.id,
        created_at: s.created_at,
      })),
    });
  } catch (error) {
    return logError(error);
  }
}
