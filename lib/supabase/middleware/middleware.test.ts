import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './middleware';
import { createServerClient } from '@supabase/ssr';

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}));

const createMockRequest = (path: string) => {
  return {
    cookies: {
      getAll: jest.fn(() => []),
      set: jest.fn(),
    },
    nextUrl: {
      pathname: path,
      clone: function () {
        return { ...this };
      },
    },
  } as unknown as NextRequest;
};

describe('updateSession middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('redirects unauthenticated user to /', async () => {
    (createServerClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      },
    });

    const request = createMockRequest('/protected-route');
    await updateSession(request);

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';

    expect(NextResponse.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  it('redirects user to /onboarding if their onboarding is set as false', async () => {
    const mockUser = { id: '123' };

    (createServerClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: jest.fn().mockResolvedValue({
              data: { onboarding_complete: false },
            }),
          }),
        }),
      }),
    });

    const request = createMockRequest('/dashboard');
    await updateSession(request);

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/onboarding';

    expect(NextResponse.redirect).toHaveBeenCalledWith(redirectUrl);
  });

  it('allows onboarded users through', async () => {
    const mockUser = { id: '456' };

    (createServerClient as jest.Mock).mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: jest.fn().mockResolvedValue({
              data: { onboarding_complete: true },
            }),
          }),
        }),
      }),
    });

    const request = await createMockRequest('/dashboard');
    await updateSession(request);

    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
