import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { ProfileUpdate } from '../../types/profile';
import { SupabaseError } from '@/lib/errors/CustomErrors';

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
      throw new SupabaseError('Failed to fetch profile', 500, error);
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof SupabaseError) {
      console.error('Supabase Error:', error.message);

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    console.error('Unexpected error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
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
      throw new SupabaseError('Failed to update profile', 500, error);
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof SupabaseError) {
      console.error('Supabase Error:', error.message);

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    console.error('Unexpected error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
