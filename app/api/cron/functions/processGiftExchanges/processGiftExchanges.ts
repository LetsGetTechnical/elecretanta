// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { GiftProcess } from '@/app/types/giftExchange';

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {object} props - The function props.
 * @param {GiftProcess} props.currentDate - The current date in 'YYYY-MM-DD' format.
 * @param {GiftProcess} props.exchange - The gift exchange record to process.
 * @param {GiftProcess} props.supabase - An instance of the Supabase client used to query the database.
 * @returns {Promise<{ drawnCount: number; completedCount: number }>} A string that tells us if any gift exchange was processed.
 */
export const processGiftExchanges = async ({
  currentDate,
  exchange,
  supabase,
}: GiftProcess): Promise<{ drawnCount: number; completedCount: number }> => {
  const drawDate = new Date(exchange.drawing_date).toISOString().split('T')[0];
  const exchangeDate = new Date(exchange.exchange_date)
    .toISOString()
    .split('T')[0];

  let drawnCount = 0;
  let completedCount = 0;

  if (drawDate === currentDate && exchange.status === 'pending') {
    await drawGiftExchange(supabase, exchange.id);
    drawnCount += 1;
  }

  if (currentDate > exchangeDate && exchange.status !== 'completed') {
    await supabase
      .from('gift_exchanges')
      .update({ status: 'completed' })
      .eq('id', exchange.id);
    completedCount += 1;
  }
  return { drawnCount, completedCount };
};
