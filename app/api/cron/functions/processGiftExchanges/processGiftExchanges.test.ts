import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { processGiftExchanges } from './processGiftExchanges';
import { SupabaseClient } from '@supabase/supabase-js';

jest.mock('@/lib/drawGiftExchange', () => ({
  drawGiftExchange: jest.fn(),
}));
const mockSupabase = {
  from: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnValue({
      eq: jest.fn().mockResolvedValue({}),
    }),
  }),
} as unknown as SupabaseClient;

describe('processGiftExchanges', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully draws the gift exchange if current day matches the drawing date and the gift exchange status is pending', async () => {
    const mockGiftExchange = {
      id: '123',
      name: 'Office Exchange',
      group_image: '',
      budget: '20',
      owner_id: 'owner123',
      drawing_date: new Date().toISOString(),
      exchange_date: new Date(Date.now() + 86400000).toISOString(),
      status: 'pending',
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const { drawnCount, completedCount } = await processGiftExchanges({
      supabase: mockSupabase,
      exchange: mockGiftExchange,
      currentDate,
    });

    expect(drawGiftExchange).toHaveBeenCalledWith(mockSupabase, '123');
    expect(drawnCount).toBe(1);
    expect(completedCount).toBe(0);
  });

  it('updates gift exchange status to completed if exchange_date has passed and status is only set as active', async () => {
    const mockPastGiftExchange = {
      id: '456',
      name: 'Old Exchange',
      group_image: '',
      budget: '20',
      owner_id: 'owner456',
      drawing_date: new Date(Date.now() - 86400000 * 2).toISOString(),
      exchange_date: new Date(Date.now() - 86400000).toISOString(),
      status: 'active',
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const { drawnCount, completedCount } = await processGiftExchanges({
      supabase: mockSupabase,
      exchange: mockPastGiftExchange,
      currentDate,
    });

    expect(mockSupabase.from).toHaveBeenCalledWith('gift_exchanges');
    expect(mockSupabase.from('gift_exchanges').update).toHaveBeenCalledWith({
      status: 'completed',
    });
    expect(
      mockSupabase.from('gift_exchanges').update({ status: 'completed' }).eq,
    ).toHaveBeenCalledWith('id', '456');
    expect(drawnCount).toBe(0);
    expect(completedCount).toBe(1);
  });
});
