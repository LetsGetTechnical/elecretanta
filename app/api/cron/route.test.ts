// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { GET } from '@/app/api/cron/route';
import { createClient } from '@/lib/supabase/server';
import { drawGiftExchange } from '@/lib/drawGiftExchange';

jest.mock('@/lib/supabase/server');
jest.mock('@/lib/drawGiftExchange');

const mockCreateClient = createClient as jest.Mock;
const mockDrawGiftExchange = drawGiftExchange as jest.Mock;

const mockGiftExchanges = [
  {
    id: 123,
    drawing_date: new Date().toISOString(),
    exchange_date: new Date(Date.now() + 86400000).toISOString(),
    status: 'pending',
  },
  {
    id: 456,
    drawing_date: new Date(Date.now() - 86400000 * 2).toISOString(),
    exchange_date: new Date(Date.now() - 86400000),
    status: 'active',
  },
];

const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      data: mockGiftExchanges,
      error: null,
    })),
    update: jest.fn(() => ({
      eq: jest.fn(),
    })),
  })),
};

describe('GET /api/cron', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateClient.mockResolvedValue(mockSupabase);
  });

  it('returns a 401 error if the CRON_SECRET is invalid', async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue(`Bearer inavlid-secret`),
      },
    };

    const response = await GET(mockRequest as any);
    expect(response.status).toBe(401);
  });

  it('processes gift exchanges and returns a success', async () => {
    const request = new Request('/api/cron', {
      headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
    });

    const response = await GET(request);
    const json = await response.json();

    expect(mockDrawGiftExchange).toHaveBeenCalledWith(mockSupabase, '123');

    expect(mockSupabase.from().update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'completed' }),
      expect.objectContaining({ id: 456 }),
    );

    expect(json.success).toBe(true);
  });

  it('returns a 500 on a Supabase fetching error', async () => {
    const selectMock = jest
      .spyOn(mockSupabase.from(), 'select')
      .mockResolvedValue({
        data: null,
        error: { message: 'Simulated fetch error' },
      });
    const request = new Request('/api/cron', {
      headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
    });

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe('Simulated fetch error');

    selectMock.mockRestore();
  });
});
