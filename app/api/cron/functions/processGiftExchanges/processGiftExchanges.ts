// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { GiftExchange } from '@/app/types/giftExchange';
import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {SupabaseClient} supabase - The .
 * @returns {Promise<void>} Returns true if the 'Authorization' header matches the expected secret, false otherwise.
 */
export const processGiftExchanges = async ({
  supabase,
  exchange,
  currentDay,
}: {
  supabase: SupabaseClient;
  exchange: GiftExchange;
  currentDay: string;
}): Promise<void> => {
  const drawDate = new Date(exchange.drawing_date).toISOString().split('T')[0];
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
};
