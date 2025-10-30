import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { ProfileUpdate } from '../../types/profile';
import { SupabaseError } from '@/lib/errors/CustomErrors';
import logError from '@/lib/errors/logError';

export async function GET() {
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
      .eq('id', session.user.id)
      .single();

    if (error) {
      throw new SupabaseError('Failed to fetch profile', error.code, error);
    }

    return NextResponse.json(data);
  } catch (error) {
    return logError(error);
  }
}

export async function PATCH(request: Request) {
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

    const updates: ProfileUpdate = await request.json();

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id)
      .select()
      .single();

    if (error) {
      throw new SupabaseError('Failed to update profile', error.code, error);
    }

    return NextResponse.json(data);
  } catch (error) {
    return logError(error);
  }
}
