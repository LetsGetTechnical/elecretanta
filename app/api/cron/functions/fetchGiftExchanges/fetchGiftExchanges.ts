// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { GiftExchange } from '@/app/types/giftExchange';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Fetches all gift exchanges in the database.
 * @param {SupabaseClient} supabase - An instance of the Supabase client used to query the database.
 * @returns {Promise<GiftExchange[]>} All gift exchanges in the form of an array of objects.
 */
export const fetchGiftExchanges = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}): Promise<GiftExchange[]> => {
  const { data, error } = await supabase.from('gift_exchanges').select('*');

  if (error) {
    throw error;
  }

  return data;
};
