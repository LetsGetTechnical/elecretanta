/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { updateSession } from './middleware';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

describe('updateSession middleware', () => {
  it('redirects user to /onboarding if their onboarding is set as false', async () => {
    const {
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: 'onboardingfalse@test.com',
      password: 'password',
    });

    const cookieHeader = `sb-access-token=${session?.access_token}; sb-refresh-token=${session?.refresh_token}`;

    const request = new NextRequest('https://localhost:4000/dashboard', {
      headers: new Headers({
        cookie: cookieHeader,
      }),
    });

    const response = await updateSession(request);
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://localhost:4000/onboarding',
    );
  });

  it('allows user to /dashboard if their onboarding is set as true', async () => {
    const {
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: 'onboardingtrue@test.com',
      password: 'password',
    });

    const cookieHeader = `sb-access-token=${session?.access_token}; sb-refresh-token=${session?.refresh_token}`;

    const request = new NextRequest('https://localhost:4000/dashboard', {
      headers: new Headers({
        cookie: cookieHeader,
      }),
    });

    const response = await updateSession(request);
    expect(response.status).toBe(200);
  });
});
