import { SupabaseClient } from '@supabase/supabase-js';

export interface GiftExchange {
  id: string;
  name: string;
  description?: string;
  group_image: string;
  budget: string;
  drawing_date: string;
  exchange_date: string;
  owner_id: string;
  created_at?: string;
  updated_at?: string;
  status: string;
}

export interface GiftExchangeWithMemberCount {
  gift_exchange_id: string;
  name: string;
  description: string;
  group_image: string;
  budget: string;
  drawing_date: string;
  exchange_date: string;
  owner_id: string;
  member_count: number;
}

export interface CreateGiftExchangeRequest {
  name: string;
  description?: string;
  group_image: string;
  budget: string;
  drawing_date: Date;
  exchange_date: Date;
}

export interface UpdateGiftExchangeRequest {
  name?: string;
  description?: string;
  group_image?: string;
  budget?: string;
  drawing_date?: string;
  exchange_date?: string;
  status?: string;
}

export interface IGiftProcess {
  currentDate: string;
  exchange: GiftExchange;
  supabase: SupabaseClient;
}

export interface IProcessGiftExchangesResult {
  drawnCount: number;
  completedCount: number;
}
