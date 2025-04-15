// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { SupabaseClient } from '@supabase/supabase-js';

interface GiftExchange {
  id: string;
  name: string;
  description: string;
  group_image: string;
  drawing_date: string;
  exchange_date: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'completed' | 'cancelled';
  budget: string;
}

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {SupabaseClient} supabase - The .
 * @returns {Promise<GiftExchange[]>} Returns true if the 'Authorization' header matches the expected secret, false otherwise.
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
