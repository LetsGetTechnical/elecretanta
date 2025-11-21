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

    const [matchResult, suggestionsResult] = await Promise.all([
      supabase
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
        .single(),
      supabase
        .from('gift_suggestions')
        .select('*')
        .eq('gift_exchange_id', id)
        .eq('giver_id', user.id),
    ]);

    if (matchResult.error) {
      throw new SupabaseError(
        'Failed to fetch match',
        matchResult.error.code,
        matchResult.error,
      );
    }

    if (suggestionsResult.error) {
      throw new SupabaseError(
        'Failed to fetch suggestions',
        suggestionsResult.error.code,
        suggestionsResult.error,
      );
    }

    return NextResponse.json({
      match: matchResult.data?.recipient,
      suggestions: (suggestionsResult.data || []).map((suggestion) => ({
        ...suggestion.suggestion,
        id: suggestion.id,
        created_at: suggestion.created_at,
      })),
    });
  } catch (error) {
    return logError(error);
  }
}
