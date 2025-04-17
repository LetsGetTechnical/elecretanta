// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { checkCronAuthorization } from './functions/checkAuthorization/checkCronAuthorization';
import { createClient } from '@/lib/supabase/server';
import { fetchGiftExchanges } from './functions/fetchGiftExchanges/fetchGiftExchanges';
import { NextResponse } from 'next/server';
import { processGiftExchanges } from './functions/processGiftExchanges/processGiftExchanges';

/**
 * API function that gets the cron job header to execute once daily.
 * @param {Request} request - API request.
 * @returns {Promise<Response>} The rendered weekly picks page.
 */
export async function GET(request: Request): Promise<Response> {
  if (!checkCronAuthorization(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const supabase = await createClient();

    const giftExchanges = await fetchGiftExchanges({ supabase });

    const currentDate = new Date().toISOString().split('T')[0];

    let totalDrawn = 0;
    let totalCompleted = 0;

    for (const exchange of giftExchanges) {
      const { drawnCount, completedCount } = await processGiftExchanges({ currentDate, exchange, supabase });
      totalDrawn += drawnCount;
      totalCompleted += completedCount;
    }

    const drawnMessage = totalDrawn > 0 ? `${totalDrawn} gift exchanges were drawn today.` : 'No gift exchanges were drawn today.';
    const completedMessage = totalCompleted > 0 ? `${totalCompleted} gift exchanges were completed today.` : 'No gift exchanges were completed today.';

    return NextResponse.json({ success: true, drawnMessage, completedMessage });
  } catch (error) {
    return NextResponse.json({ error });
  }
}