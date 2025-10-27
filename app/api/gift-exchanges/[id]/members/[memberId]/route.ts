import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { UpdateGiftExchangeMemberRequest } from '@/app/types/giftExchangeMember';
import { SupabaseError } from '@/lib/errors/CustomErrors';

// update a gift exchange member
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const exchangeId = searchParams.get('exchangeId');
  const memberId = searchParams.get('memberId');

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

    const body: UpdateGiftExchangeMemberRequest = await req.json();

    const { data, error } = await supabase
      .from('gift_exchange_members')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', memberId)
      .eq('gift_exchange_id', exchangeId)
      .select()
      .single();

    if (error) {
      throw new SupabaseError(
        'Could not update gift exchange members',
        500,
        error,
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof SupabaseError) {
      console.error('Supabase error:', error);

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

// delete a gift exchange member
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const exchangeId = searchParams.get('exchangeId');
  const memberId = searchParams.get('memberId');

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

    const { error } = await supabase
      .from('gift_exchange_members')
      .delete()
      .eq('id', memberId)
      .eq('gift_exchange_id', exchangeId);

    if (error) {
      throw new SupabaseError(
        'Could not delete gift exchange member',
        500,
        error,
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof SupabaseError) {
      console.error('Supabase error:', error);

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
