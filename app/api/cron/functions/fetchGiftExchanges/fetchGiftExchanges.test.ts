import { SupabaseClient } from '@supabase/supabase-js';
import { fetchGiftExchanges } from './fetchGiftExchanges';
import { createClient } from '@/lib/supabase/server';

jest.mock('@/lib/supabase/server');

const mockSelect = jest.fn();
const mockFrom = jest.fn(() => ({
  select: mockSelect,
}));

const mockSupabase = {
  from: mockFrom,
} as unknown as SupabaseClient;

describe('fetchGiftExchanges', () => {
  beforeEach(() => {
    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
    jest.clearAllMocks();
  });

  it('returns data when fetch is successful', async () => {
    const mockData = [{ id: 123, status: 'pending' }];

    mockSelect.mockResolvedValueOnce({ data: mockData, error: null });

    const result = await fetchGiftExchanges({ supabase: mockSupabase });

    expect(result).toEqual(mockData);
  });

  it('throws an error when fetch fails', async () => {
    mockSelect.mockResolvedValueOnce({
      data: null,
      error: new Error('Something went wrong'),
    });

    await expect(
      fetchGiftExchanges({ supabase: mockSupabase }),
    ).rejects.toThrow('Something went wrong');
  });
});
