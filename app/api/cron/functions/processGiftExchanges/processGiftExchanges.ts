// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { GiftExchange, GiftProcess } from '@/app/types/giftExchange';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {object} props - The function props.
 * @param {string} props.currentDate - The current date in 'YYYY-MM-DD' format.
 * @param {GiftExchange} props.exchange - The gift exchange record to process.
 * @param {SupabaseClient} props.supabase - An instance of the Supabase client used to query the database.
 * @returns {Promise<void>} A promise that resolves when the processing is complete. Does not return a value.
 */
export const processGiftExchanges = async ({
  currentDate,
  exchange,
  supabase,
}: GiftProcess): Promise<void> => {
  const drawDate = new Date(exchange.drawing_date).toISOString().split('T')[0];
  const exchangeDate = new Date(exchange.exchange_date)
    .toISOString()
    .split('T')[0];

  if (drawDate === currentDate && exchange.status === 'pending') {
    await drawGiftExchange(supabase, exchange.id);
  }

  if (currentDate > exchangeDate && exchange.status !== 'completed') {
    await supabase
      .from('gift_exchanges')
      .update({ status: 'completed' })
      .eq('id', exchange.id);
  }
};
