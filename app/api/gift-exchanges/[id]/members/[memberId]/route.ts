import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { UpdateGiftExchangeMemberRequest } from '@/app/types/giftExchangeMember';
import { SupabaseError } from '@/lib/errors/CustomErrors';
import logError from '@/lib/errors/logError';

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
        error.code,
        error,
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return logError(error);
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
        error.code,
        error,
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return logError(error);
  }
}
