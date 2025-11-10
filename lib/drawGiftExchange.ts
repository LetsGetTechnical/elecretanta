// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { SupabaseClient } from '@supabase/supabase-js';
import { generateAndStoreSuggestions } from './generateAndStoreSuggestions';

/**
 * Performs random drawing for matching of users in gift exchange.
 * If successful, updates the record from gift_exchanges and the
 * related gift_exchange_members to reflect the results of the drawing.
 * @param {SupabaseClient} supabase - Supabase client instance
 * @param {string} exchangeId - Unique ID for the gift exchange
 * @returns {Promise<{success: boolean}>} - Promise resolving to an object with a success indicator
 * @throws {Error} - Will throw if drawing criteria is not correct or if any DB call fails
 */
export async function drawGiftExchange(
  supabase: SupabaseClient,
  exchangeId: string,
): Promise<{ success: boolean }> {
  // Get exchange and verify ownership
  const { data: exchange, error: exchangeError } = await supabase
    .from('gift_exchanges')
    .select('*')
    .eq('id', exchangeId)
    .single();

  if (exchangeError || !exchange) {
    throw new Error('Gift exchange not found');
  }

  // Check exchange status
  if (exchange.status !== 'pending') {
    throw new Error('Names have already been drawn');
  }

  // Get all members
  const { data: members, error: membersError } = await supabase
    .from('gift_exchange_members')
    .select('id, user_id')
    .eq('gift_exchange_id', exchangeId);

  if (membersError || !members) {
    throw new Error('Failed to fetch members');
  }

  //Validate minimum members
  if (members.length < 3) {
    throw new Error('At least 3 members are required');
  }

  // Shuffle members to assign
  const shuffledMembers = [...members].sort(() => Math.random() - 0.5);

  // Update assignments
  for (let i = 0; i < shuffledMembers.length; i++) {
    const giver = shuffledMembers[i];
    // Last person gives to first person, closing the circle
    const recipient = shuffledMembers[(i + 1) % shuffledMembers.length];

    const { error: updateError } = await supabase
      .from('gift_exchange_members')
      .update({
        recipient_id: recipient.user_id,
        has_drawn: true,
      })
      .eq('id', giver.id);

    if (updateError) {
      throw new Error('Failed to assign recipients');
    }
  }

  // Update exchange status to active
  const { error: statusError } = await supabase
    .from('gift_exchanges')
    .update({ status: 'active' })
    .eq('id', exchangeId);

  if (statusError) {
    throw new Error('Failed to update exchange status');
  }

  return { success: true };
}
