import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { DrawingEmail } from '@/emails/DrawingEmail';

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const body = await req.json();
        const { members } = body;

        // Send emails to all members
        for (const member of members) {
            const result = await resend.emails.send({
                from: 'Secret Santa <onboarding@resend.dev>',
                to: member.member.email,
                subject: 'Your Secret Santa Match is Ready!',
                react: DrawingEmail({userFirstname: member.name})
            })

            console.log('Email result:', result);
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({error: 'Failed to send emails'});
    }
}