// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { DrawingEmail } from '@/emails/DrawingEmail';
import { createClient } from '@/lib/supabase/server';

/**
 * POST handler to send Secret Santa match emails to all members.
 * Validates input, sends emails in parallel, and reports partial failures.
 * @param req - Incoming Next.js request containing JSON body with members and suggestions.
 * @param req.body.members - Array of member objects with user_id, member info, and recipient.
 * @param req.body.suggestions - Array of gift suggestion objects linked by giver_id.
 * @param props - Route handler props.
 * @param props.params - Promise resolving to route parameters.
 * @param props.params.id - The gift exchange ID from the URL.
 * @returns {Promise<NextResponse>} JSON response with { success: true } on success,
 *   or { error: string, details?: string } with appropriate status code on failure.
 * @throws Returns 401 if user is not authenticated.
 * @throws Returns 403 if user does not own the gift exchange.
 * @throws Returns 500 if RESEND_API_KEY is missing or email sending fails.
 */
export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const params = await props.params;
  const id = params.id;

  // Add authentication
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify user is the owner of this gift exchange
  const { data: exchange, error: exchangeError } = await supabase
    .from('gift_exchanges')
    .select('owner_id')
    .eq('id', id)
    .single();

  if (exchangeError || !exchange || exchange.owner_id !== user.id) {
    return NextResponse.json(
      { error: 'Forbidden: You do not own this gift exchange' },
      { status: 403 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { members, suggestions } = body;

    // Send emails to all members
    for (const member of members) {
      const recommendedGifts = [];
      for (const gift of suggestions) {
        if (member.user_id === gift.giver_id) {
          recommendedGifts.push({
            id: gift.id,
            title: gift.suggestion.title,
            price: gift.suggestion.price,
            description: gift.suggestion.description,
            matchReasons: gift.suggestion.matchReasons,
            matchScore: gift.suggestion.matchScore,
            imageUrl: gift.suggestion.imageUrl,
          });
        }
      }
      await resend.emails.send({
        from: 'Secret Santa <onboarding@resend.dev>',
        to: member.member.email,
        subject: 'Your Secret Santa Match is Ready!',
        // eslint-disable-next-line new-cap
        react: DrawingEmail({
          userName: member.member.display_name,
          recipient: member.recipient,
          giftSuggestions: recommendedGifts,
        }),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
