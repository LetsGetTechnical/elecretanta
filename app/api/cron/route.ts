// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { checkCronAuthorization } from './functions/checkAuthorization/checkCronAuthorization';
import { createClient } from '@/lib/supabase/server';
import { fetchGiftExchanges } from './functions/fetchGiftExchanges/fetchGiftExchanges';
import { NextResponse } from 'next/server';
import { processGiftExchanges } from './functions/processGiftExchanges/processGiftExchanges';
import { SupabaseError, OpenAiError } from '@/lib/errors/CustomErrors';

/**
 * API function that gets the cron job header to execute once daily.
 * @param {Request} request - API request.
 * @returns {Promise<Response>} The rendered weekly picks page.
 */
export async function GET(request: Request): Promise<Response> {
  if (!checkCronAuthorization(request)) {
    console.error('Invalid authorization header.');
    return NextResponse.json({ status: false });
  }

  try {
    const supabase = await createClient();

    const giftExchanges = await fetchGiftExchanges({ supabase });

    const currentDate = new Date().toISOString().split('T')[0];

    let totalDrawn = 0;
    let totalCompleted = 0;

    for (const exchange of giftExchanges) {
      const { drawnCount, completedCount } = await processGiftExchanges({
        currentDate,
        exchange,
        supabase,
      });
      totalDrawn += drawnCount;
      totalCompleted += completedCount;
    }

    const drawnMessage =
      totalDrawn > 0
        ? `${totalDrawn} gift exchanges were drawn today.`
        : 'No gift exchanges were drawn today.';
    const completedMessage =
      totalCompleted > 0
        ? `${totalCompleted} gift exchanges were completed today.`
        : 'No gift exchanges were completed today.';

    return NextResponse.json({ success: true, drawnMessage, completedMessage });
  } catch (error) {
    if (error instanceof SupabaseError) {
      console.error('Supabase error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    } else if (error instanceof OpenAiError) {
      console.error('OpenAI error:', error);

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
