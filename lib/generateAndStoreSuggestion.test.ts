import { generateAndStoreSuggestions } from './generateAndStoreSuggestion';
import { getAmazonImage } from './getAmazonImage';
import { SupabaseClient } from '@supabase/supabase-js';
import { openai } from '../app/api/openaiConfig/config';

jest.mock('../app/api/openaiConfig/config', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

jest.mock('./getAmazonImage', () => ({
  getAmazonImage: jest.fn(),
}));

describe('generateAndStoreSuggestions', () => {
  const mockSingle = jest.fn();
  const mockInsert = jest.fn();

  const mockFrom = jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    insert: mockInsert,
    single: mockSingle,
  }));

  const mockSupabase = {
    from: mockFrom,
  } as unknown as SupabaseClient;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates and stores suggestions', async () => {
    mockSingle.mockResolvedValue({
      data: {
        age_group: '25-34',
        hobbies: 'reading, hiking',
        avoid: 'perfume',
        categories: ['books', 'outdoors'],
        practical_whimsical: 70,
        cozy_adventurous: 50,
        minimal_luxurious: 30,
      },
      error: null,
    });

    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify([
              {
                title: 'Kindle Paperwhite',
                price: '129.99',
                description: 'Test description',
                matchReasons: [
                  'Loves reading',
                  'Something else',
                  'Another thing',
                ],
                matchScore: 95,
              },
            ]),
          },
        },
      ],
    });

    (getAmazonImage as jest.Mock).mockResolvedValue({
      imageUrl: 'https://amazon.com/kindle.jpg',
    });

    mockInsert.mockResolvedValue({ error: null });

    await generateAndStoreSuggestions(
      mockSupabase,
      'Exchange1',
      'Giver1',
      'Recipient1',
      150,
    );

    expect(mockFrom).toHaveBeenCalledWith('profiles');
    expect(openai.chat.completions.create as jest.Mock).toHaveBeenCalled();
    expect(getAmazonImage).toHaveBeenCalledWith('Kindle Paperwhite');
    expect(mockFrom).toHaveBeenCalledWith('gift_suggestions');
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        gift_exchange_id: 'Exchange1',
        giver_id: 'Giver1',
        recipient_id: 'Recipient1',
        suggestion: expect.objectContaining({
          title: 'Kindle Paperwhite',
          imageUrl: 'https://amazon.com/kindle.jpg',
        }),
      }),
    );
  });
});
