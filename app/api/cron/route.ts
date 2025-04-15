// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { checkAuthorization } from './functions/checkAuthorization/checkAuthorization';
import { createClient } from '@/lib/supabase/server';
import { fetchGiftExchanges } from './functions/fetchGiftExchanges/fetchGiftExchanges';
import { NextResponse } from 'next/server';
import { processGiftExchanges } from './functions/processGiftExchanges/processGiftExchanges';

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {Request} request - API request.
 * @returns {Promise<Response>} The rendered weekly picks page.
 */
export async function GET(request: Request): Promise<Response> {
  if (!checkAuthorization(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const supabase = await createClient();

    const giftExchanges = await fetchGiftExchanges({ supabase });

    const currentDay = new Date().toISOString().split('T')[0];

    for (const exchange of giftExchanges) {
      await processGiftExchanges({ currentDay, exchange, supabase });
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
