import { UpdateGiftExchangeRequest } from '@/app/types/giftExchange';
import { createClient } from '@/lib/supabase/server';
import { validateGroupExchangeDates } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { SupabaseError, BackendError } from '@/lib/errors/CustomErrors';

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const id = await params.id;
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('gift_exchanges')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new SupabaseError('Could not fetch gift exchange.', 500, error);
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
    console.error(error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PATCH(
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

    const body: UpdateGiftExchangeRequest = await req.json();

    // Validate dates if both are provided
    if (body.drawing_date && body.exchange_date) {
      const drawingDate = new Date(body.drawing_date);
      const exchangeDate = new Date(body.exchange_date);
      const dateError = validateGroupExchangeDates(drawingDate, exchangeDate);

      if (dateError) {
        throw new BackendError('Invalid date for group exchange', 400);
      }
    }

    const { data, error } = await supabase
      .from('gift_exchanges')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new SupabaseError('Could not update gift exchange', 500, error);
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
    console.log(error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
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
      .from('gift_exchanges')
      .delete()
      .eq('id', id);

    if (error) {
      throw new SupabaseError('Failed to delete gift exchange', 500, error);
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
    console.log(error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
