/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { createAuthedRequest, updateSession } from './middleware';

describe('Middleware', () => {
  it('redirects unauthenticated user back to /', async () => {
    const request = new NextRequest('https://localhost:4000/dashboard');
    const response = await updateSession(request);
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://localhost:4000/');
  });
  it('redirects user to go to /onboarding if their onboarding is set as false', async () => {
    const response = await createAuthedRequest({
      email: 'onboardingfalse@test.com',
      password: 'password',
      path: '/dashboard',
    });
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'https://localhost:4000/onboarding',
    );
  });

  it('allows user to go to /dashboard if their onboarding is set as true', async () => {
    const response = await createAuthedRequest({
      email: 'onboardingtrue@test.com',
      password: 'password',
      path: '/dashboard',
    });
    expect(response.status).toBe(200);
  });

  it('does not redirect user away from /onboarding if they want to go back and edit their profile', async () => {
    const response = await createAuthedRequest({
      email: 'onboardingtrue@test.com',
      password: 'password',
      path: '/onboarding',
    });
    expect(response.status).toBe(200);
  });

  it('allows unauthenticated user to access /gift-exchanges to sign up and join the group via invite link', async () => {
    const request = new NextRequest('https://localhost:4000/gift-exchanges');
    const response = await updateSession(request);
    expect(response.status).toBe(200);
  });

  it('throws an error if Supabase fails to fetch the user', async () => {
    const invalidToken = 'sb-access-token=invalid.token.value';
    const request = new NextRequest('https://localhost:4000/dashboard', {
      headers: new Headers({
        cookie: invalidToken,
      }),
    });

    await expect(updateSession(request)).rejects.toThrow();
  });
});
