import 'next/dist/server/web/spec-extension/request';
import 'next/dist/server/web/spec-extension/response';

import { NextRequest } from 'next/server';
import { updateSession } from './middleware';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

describe('updateSession middleware', () => {
  let userId: string;

  beforeAll(async () => {
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.createUser({
        email: 'test@email.com',
        password: 'password',
        email_confirm: true,
        user_metadata: { full_name: 'Test User' },
      });

    if (userError || !userData.user?.id) {
      throw userError;
    }

    userId = userData.user.id;
  });

  afterAll(async () => {
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.error('Failed to delete profile:', profileError);
    }

    const { error: userError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (userError) {
      console.error('Failed to delete user:', userError);
    }
  });

  it('redirects user to /onboarding if their onboarding is set as false', async () => {
    await supabase.auth.signInWithPassword({
      email: 'test@email.com',
      password: 'password',
    });

    const request = {
      url: 'https://localhost:4000/dashboard',
      headers: new Headers(),
      cookies: new Map(),
    } as unknown as NextRequest;

    const response = await updateSession(request);
    expect(response).toBe(307);
    expect(response.headers.get('location')).toBe('/onboarding');
  });
});
