// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { DrawingEmail } from '@/emails/DrawingEmail';

/**
 * POST handler to send Secret Santa match emails to all members.
 * Validates input, sends emails in parallel, and reports partial failures.
 * @param req Incoming Next.js request containing JSON body { members: [...] }
 * @returns JSON response indicating success or failures.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { members } = body;

    // Send emails to all members
    for (const member of members) {
      await resend.emails.send({
        from: 'Secret Santa <onboarding@resend.dev>',
        to: member.member.email,
        subject: 'Your Secret Santa Match is Ready!',
        // eslint-disable-next-line new-cap
        react: DrawingEmail({ userName: member.name })
      })

    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: `Failed to send emails - ${error}` });
  }
}