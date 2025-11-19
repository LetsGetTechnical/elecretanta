// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { SupabaseClient } from '@supabase/supabase-js';
import { generateAndStoreSuggestions } from './generateAndStoreSuggestions';
import { BackendError, SupabaseError } from './errors/CustomErrors';

/**
 * Performs random drawing for matching of users in gift exchange.
 * If successful, updates the record from gift_exchanges and the
 * related gift_exchange_members to reflect the results of the drawing.
 * @param {SupabaseClient} supabase - Supabase client instance
 * @param {string} exchangeId - Unique ID for the gift exchange
 * @returns {Promise<void>} - Promise that resolves when the drawing is complete
 * @throws {Error} - Will throw if drawing criteria is not correct or if any DB call fails
 */
export async function drawGiftExchange(
  supabase: SupabaseClient,
  exchangeId: string,
): Promise<void> {
  try {
    // Get exchange and verify ownership
    const { data: exchange, error: exchangeError } = await supabase
      .from('gift_exchanges')
      .select('*')
      .eq('id', exchangeId)
      .single();

    if (exchangeError) {
      throw new SupabaseError(
        'Gift exchange not found',
        exchangeError.code,
        exchangeError,
      );
    }

    if (!exchange) {
      throw new SupabaseError('Gift exchange not found', 404);
    }

    // Check exchange status
    if (exchange.status !== 'pending') {
      throw new BackendError('Names have already been drawn', 400);
    }

    // Get all members
    const { data: members, error: membersError } = await supabase
      .from('gift_exchange_members')
      .select('id, user_id')
      .eq('gift_exchange_id', exchangeId);

    if (membersError) {
      throw new SupabaseError(
        'Failed to fetch members',
        membersError.code,
        membersError,
      );
    }

    if (!members) {
      throw new SupabaseError('Failed to fetch members', 404);
    }

    //Validate minimum members
    if (members.length < 3) {
      throw new BackendError('At least 3 members are required', 400);
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
        throw new SupabaseError(
          'Failed to assign recipients',
          updateError.code,
          updateError,
        );
      }

      // Fire and forget suggestions with error handling
      // hacky way to avoid waiting for all suggestions to be generated
      // avoids timeout issues
      await generateAndStoreSuggestions(
        supabase,
        exchangeId,
        giver.user_id,
        recipient.user_id,
        exchange.budget,
      );
    }

    // Update exchange status to active
    const { error: statusError } = await supabase
      .from('gift_exchanges')
      .update({ status: 'active' })
      .eq('id', exchangeId);

    if (statusError) {
      throw new SupabaseError(
        'Failed to update exchange status',
        statusError.code,
        statusError,
      );
    }
  } catch (error) {
    throw error;
  }
}
