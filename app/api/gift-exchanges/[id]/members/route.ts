import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { CreateGiftExchangeMemberRequest } from '@/app/types/giftExchangeMember';
import { SupabaseError, BackendError } from '@/lib/errors/CustomErrors';
import logError from '@/lib/errors/logError';

// get all members of a gift exchange
export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const id = await params.id;

  try {
    const supabase = await createClient();

    const query = supabase
      .from('gift_exchange_members')
      .select(
        `
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
      `,
      )
      .eq('gift_exchange_id', id);

    const { data: membersData, error: membersError } = await query;

    if (membersError) {
      throw new SupabaseError(
        'Gift exchange members not found',
        404,
        membersError,
      );
    }

    return NextResponse.json(membersData);
  } catch (error) {
    return logError(error);
  }
}

// add a member to a gift exchange
export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const giftExchangeId = await params.id;

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

    // Get and validate request body
    const body: CreateGiftExchangeMemberRequest = await req.json();

    if (!body.user_id) {
      throw new BackendError('User ID is required', 400);
    }

    // Check if exchange exists and is valid
    const { data: exchange, error: exchangeError } = await supabase
      .from('gift_exchanges')
      .select('status')
      .eq('id', giftExchangeId)
      .single();

    if (exchangeError || !exchange) {
      throw new SupabaseError('Gift exchange not found', 404, exchangeError);
    }

    // Insert new member
    const { data, error } = await supabase
      .from('gift_exchange_members')
      .insert({
        gift_exchange_id: giftExchangeId,
        user_id: body.user_id,
        recipient_id: null,
        has_drawn: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new SupabaseError(
        'Failed to create gift exchange member',
        500,
        error,
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return logError(error);
  }
}
