import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { BackendError, SupabaseError } from '@/lib/errors/CustomErrors';
import logError from '@/lib/errors/logError';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const id = await params.id;

  if (!id) {
    throw new BackendError('Missing id parameter', 400);
  }

  try {
    const supabase = await createClient();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw new SupabaseError('Failed to fetch session', 500, sessionError);
    }

    if (!session) {
      throw new SupabaseError('User is unauthorized', 401, sessionError);
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new SupabaseError(
        'Could not fetch user profile',
        error.code,
        sessionError,
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return logError(error);
  }
}
