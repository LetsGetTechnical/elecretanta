// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { GiftExchange } from '@/app/types/giftExchange';
import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {object} props - The function props.
 * @param {SupabaseClient} props.supabase - An instance of the Supabase client used to query the database.
 * @param {GiftExchange} props.exchange - The gift exchange record to process.
 * @param {string} props.currentDay - The current date in 'YYYY-MM-DD' format.
 * @returns {Promise<void>} A promise that resolves when the processing is complete. Does not return a value.
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
