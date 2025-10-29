// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, cleanup } from '@testing-library/react';
import { GiftExchangeHeader } from './GiftExchangeHeader';
import { GROUP_IMAGES } from '../ImageSelector/ImageSelector';

const mockGiftExchangeDataPending = {
  id: 'abc',
  name: 'Test Exchange',
  budget: '50',
  status: 'pending',
  group_image: 'invalid_src',
  drawing_date: '',
  exchange_date: '',
  owner_id: '111',
};

const mockGiftExchangeDataActive = {
  id: 'abc',
  name: 'Test Exchange',
  budget: '50',
  status: 'active',
  group_image: 'invalid_src',
  drawing_date: '',
  exchange_date: '',
  owner_id: '111',
};

const mockMembersData = [
  {
    id: "100",
    gift_exchange_id: "abc",
    user_id: "111",
    recipient_id: null,
    has_drawn: false,
    created_at: new Date("2025-10-15T15:32:39.598652+00:00"),
    updated_at: new Date("2025-10-15T15:32:39.598652+00:00"),
    member: {
        email: "kelly@gmail.com",
        avatar: "",
        display_name: "Kelly"
    },
    recipient: {
      display_name: "",
      email: "",
      avatar: "",
    },
  },
  {
    id: "200",
    gift_exchange_id: "abc",
    user_id: "222",
    recipient_id: null,
    has_drawn: false,
    created_at: new Date("2025-10-15T15:32:39.598652+00:00"),
    updated_at: new Date("2025-10-15T15:32:39.598652+00:00"),
    member: {
        email: "bobby@gmail.com",
        avatar: "",
        display_name: "Bobby"
    },
    recipient: {
      display_name: "",
      email: "",
      avatar: "",
    },
  }
]

// Mock the Supabase client
const mockGetUser = jest.fn();
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

describe('GiftExchangeHeader', () => {

  beforeEach(() => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: '111',
        },
      },
      error: null,
    });
  });

  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it('passes the src and alt to the <Image/> when the src IS in the GROUP_IMAGES list', () => {
    const validImage = GROUP_IMAGES[1];
    const giftExchangeWithValidImageSrc = {
      ...mockGiftExchangeDataPending,
      group_image: validImage.src,
    };
    render(
      <GiftExchangeHeader
        giftExchangeData={giftExchangeWithValidImageSrc}
        members={[]}
        id={undefined}
      />,
    );

    expect(
      screen.getByRole('img', { name: validImage.alt }),
    ).toBeInTheDocument();
  });

  it('passes the fallback src and alt to the <Image/> when the src is NOT in the GROUP_IMAGES list', () => {
    const fallbackImage = GROUP_IMAGES[0];

    render(
      <GiftExchangeHeader
        giftExchangeData={mockGiftExchangeDataPending}
        members={[]}
        id={undefined}
      />,
    );

    expect(
      screen.getByRole('img', { name: fallbackImage.alt }),
    ).toBeInTheDocument();
  });
});

describe('GiftExchangeHeader owner permissions', () => {

  beforeEach(() => {
    // Reset to default owner mock before each test
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: '111', // Default owner ID matching the gift exchange
        },
      },
      error: null,
    });
  });

  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  it('matching user_id and owner_id should render the draw gift exchange button', async () => {
    
    render(
      <GiftExchangeHeader
      giftExchangeData={mockGiftExchangeDataPending}
      members={mockMembersData}
      id={mockGiftExchangeDataPending.id} 
      />
    );
    
    const drawButton = await screen.findByRole("button", { name: /draw gift exchange/i });
    expect(drawButton).toBeInTheDocument();
    
  })
  
  it('non-owner should NOT see the draw gift exchange button', async () => {
    // Override for this specific test
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: '999', // Different from owner_id
        },
      },
      error: null,
    });

    render(
      <GiftExchangeHeader
      giftExchangeData={mockGiftExchangeDataPending}
      members={mockMembersData}
      id={mockGiftExchangeDataPending.id} 
      />
    );
    
    // Button should not be rendered for non-owners
    let drawButton = null;
    try {
      drawButton = await screen.findByRole("button", { name: /draw gift exchange/i });
    } catch(error) {
      console.error(error);
    }
    expect(drawButton).not.toBeInTheDocument();
  });

  it('matching user_id and owner_id should render the complete gift exchange button', async () => {
    
    render(
      <GiftExchangeHeader
      giftExchangeData={mockGiftExchangeDataActive}
      members={mockMembersData}
      id={mockGiftExchangeDataActive.id} 
      />
    );
    
    const completeButton = await screen.findByRole("button", { name: /complete gift exchange/i });
    expect(completeButton).toBeInTheDocument();
    
  })

  it('non-owner should NOT see the complete gift exchange button', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: '999', // Different from owner_id
        },
      },
      error: null,
    });

    render(
      <GiftExchangeHeader
      giftExchangeData={mockGiftExchangeDataActive}
      members={mockMembersData}
      id={mockGiftExchangeDataActive.id} 
      />
    );
    
    // Button should NOT be rendered for non-owners
    let completeButton = null;
    try {
      completeButton = await screen.findByRole("button", { name: /complete gift exchange/i });
    } catch(error) {
      console.error(error);
    }
    expect(completeButton).not.toBeInTheDocument();
  });
  
});
