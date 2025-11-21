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

    const assignments = shuffledMembers.map((member, index) => ({
      giver: member,
      recipient: shuffledMembers[(index + 1) % shuffledMembers.length],
    }));

    // Perform all member recipient assignments in parallel
    const assignmentResults = await Promise.allSettled(
      assignments.map((assignment) =>
        supabase
          .from('gift_exchange_members')
          .update({ recipient_id: assignment.recipient.user_id, has_drawn: true })
          .eq('id', assignment.giver.id),
      ),
    );

    for (const result of assignmentResults) {
      if (result.status === 'rejected') {
        throw new SupabaseError('Failed to assign recipients', 500);
      }
      if ('value' in result && result.value.error) {
        throw new SupabaseError(
          'Failed to assign recipients',
          result.value.error.code,
          result.value.error,
        );
      }
    }

    // Generate suggestions for all members concurrently (do not block one another)
    await Promise.allSettled(
      assignments.map((assignment) =>
        generateAndStoreSuggestions(
          supabase,
          exchangeId,
          assignment.giver.user_id,
          assignment.recipient.user_id,
          exchange.budget,
        ),
      ),
    );

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
