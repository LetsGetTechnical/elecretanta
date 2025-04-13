// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { drawGiftExchange } from '@/lib/drawGiftExchange';

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {Request} request - API request.
 * @returns {Promise<Response>} The rendered weekly picks page.
 */
export async function GET(request: Request): Promise<Response> {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const supabase = await createClient();

    const { data: giftExchanges, error: giftExchangesError } = await supabase
      .from('gift_exchanges')
      .select('*');

    if (giftExchangesError) {
      return NextResponse.json(
        { error: 'Error fetching gift exchanges' },
        { status: 500 },
      );
    }

    const currentDay = new Date().toISOString().split('T')[0];

    for (const exchange of giftExchanges) {
      const drawDate = new Date(exchange.drawing_date)
        .toISOString()
        .split('T')[0];
      const exchangeDate = new Date(exchange.exchange_date)
        .toISOString()
        .split('T')[0];

      if (drawDate === currentDay && exchange.status === 'pending') {
        await drawGiftExchange(supabase, exchange.id);
      }

      if (currentDay > exchangeDate && exchange.status !== 'completed') {
        await supabase
          .from('gift_exchanges')
          .update({ status: 'completed' })
          .eq('id', exchange.id);
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    let status = 500; // default status
    if (message.includes('not found')) {
      status = 404;
    } else if (
      message.includes('already been drawn') ||
      message.includes('3 members')
    ) {
      status = 400;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
