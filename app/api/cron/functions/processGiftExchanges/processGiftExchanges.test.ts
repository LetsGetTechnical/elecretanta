import { drawGiftExchange } from '@/lib/drawGiftExchange';
import { processGiftExchanges } from './processGiftExchanges';
import { SupabaseClient } from '@supabase/supabase-js';

jest.mock('@/lib/drawGiftExchange', () => ({
  drawGiftExchange: jest.fn(),
}));

const mockEq = jest.fn();
const mockUpdate = jest.fn(() => ({
  eq: mockEq,
}));

const mockSupabase = {
  from: jest.fn(() => ({
    update: mockUpdate,
  })),
} as unknown as SupabaseClient;

describe('processGiftExchanges', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully draws the gift exchange if current day matches the drawing date and the gift exchange status if pending', async () => {
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

  it('updates gift exchange status to completed if exchange_date has passed and status is not set as completed yet', async () => {
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
    expect(mockUpdate).toHaveBeenCalledWith({ status: 'completed' });
    expect(mockEq).toHaveBeenCalledWith('id', '456');
    expect(drawnCount).toBe(0);
    expect(completedCount).toBe(1);
  });

  it('does not draw the gift exchange if the current day matches the drawing date and the status is set as cancelled', async () => {
    const mockCancelledGiftExchange = {
      id: '789',
      name: 'Cancelled Exchange',
      group_image: '',
      budget: '20',
      owner_id: 'owner789',
      drawing_date: new Date().toISOString(),
      exchange_date: new Date(Date.now() + 86400000).toISOString(),
      status: 'cancelled',
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const { drawnCount, completedCount } = await processGiftExchanges({
      supabase: mockSupabase,
      exchange: mockCancelledGiftExchange,
      currentDate,
    });

    expect(drawGiftExchange).not.toHaveBeenCalledWith(mockSupabase, '789');
    expect(drawnCount).toBe(0);
    expect(completedCount).toBe(0);
  });

  it('does not update the gift exchange status to completed if exchange_date has passed and the status is set as cancelled', async () => {
    const mockOldCancelledGiftExchange = {
      id: '123',
      name: 'Cancelled Exchange',
      group_image: '',
      budget: '20',
      owner_id: 'owner123',
      drawing_date: new Date(Date.now() - 86400000 * 2).toISOString(),
      exchange_date: new Date(Date.now() - 86400000).toISOString(),
      status: 'cancelled',
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const { drawnCount, completedCount } = await processGiftExchanges({
      supabase: mockSupabase,
      exchange: mockOldCancelledGiftExchange,
      currentDate,
    });

    expect(mockSupabase.from).not.toHaveBeenCalled();
    expect(drawnCount).toBe(0);
    expect(completedCount).toBe(0);
  });
});
