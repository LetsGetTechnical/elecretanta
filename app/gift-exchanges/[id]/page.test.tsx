import { render, screen, waitFor } from '@testing-library/react';
import GiftExchangePage from './page';
import { useAuthContext } from '@/context/AuthContextProvider';
import * as utils from '@/lib/utils';
import { TOASTS } from '@/components/Toast/toasts.consts';
import type { IGiftSuggestion } from '@/app/types/giftSuggestion';

type GiftSuggestionsResponse = {
  match: null;
  suggestions: IGiftSuggestion[];
};

const routerPush = jest.fn();

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      onAuthStateChange: jest.fn(),
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'test-member' } } }),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      then: jest.fn(),
    })),
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn().mockReturnThis(),
    })),
    removeChannel: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '123' }),
  useRouter: () => ({
    push: routerPush,
  }),
}));

jest.mock('@/context/AuthContextProvider');

jest.mock('@/app/api/openaiConfig/config', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

const mockToast = jest.fn();

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: mockToast,
  })),
}));

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  signInWithGoogle: jest.fn(),
}));

const mockGiftExchangeData = {
  id: '123',
  name: 'Test Exchange',
  budget: '50',
};

const mockGiftSuggestions: GiftSuggestionsResponse = {
  match: null,
  suggestions: [],
};

const mockGiftSuggestionsFull: GiftSuggestionsResponse = {
  match: null,
  suggestions: [
    {
        "price": "$50",
        "title": "Bamboo Cheese Board and Knife Set",
        "imageUrl": null,
        "matchScore": 80,
        "description": "This elegant bamboo cheese board comes with a hidden slide-out drawer that holds a cheese knife set. Perfect for hosting gatherings and enjoying a selection of cheeses.",
        "matchReasons": [
            "Luxurious bamboo material",
            "Ideal for hosting food-related events"
        ],
        "id": "1451",
    },
    {
        "price": "$60",
        "title": "Swarovski Crystal Watch",
        "imageUrl": null,
        "matchScore": 90,
        "description": "A stunning Swarovski crystal watch that combines functionality with luxury. The intricate design and sparkling crystals make it a stylish accessory for any occasion.",
        "matchReasons": [
            "Luxurious item for a luxury watch enthusiast",
            "Adds a touch of style and fashion"
        ],
        "id": "1454",
    },
    {
        "price": "$55",
        "title": "Artisanal Gluten-Free Baking Kit",
        "imageUrl": null,
        "matchScore": 85,
        "description": "A complete baking kit with high-quality gluten-free ingredients and recipes for creating delicious treats at home. Perfect for someone with a gluten allergy who enjoys baking.",
        "matchReasons": [
            "Caters to gluten allergy",
            "Combines food & cooking with arts & crafts"
        ],
        "id": "1455",
    }
  ],
};

const mockGroupMember = {
  id: '1',
  user_id: 'test-member',
  member: { avatar: 'https://example.com/mock-avatar.png' },
};

const mockNonGroupMember = { ...mockGroupMember, id: 'not-a-member' };

const mockMembers = [mockGroupMember];

const mockMemberSession = {
  session: {
    user: mockGroupMember,
  },
};

const mockNonMemberSession = {
  session: {
    user: mockNonGroupMember,
  },
};

const mockNoSession = { session: null };

describe('GiftExchangePage', () => {
  const mockDataFetch = (status: string, suggestions = mockGiftSuggestions) => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({ ...mockGiftExchangeData, status }),
      })
      .mockResolvedValueOnce({
        json: async () => mockMembers,
      })
      .mockResolvedValueOnce({
        json: async () => suggestions,
      });
  };

  const mockFetchWithoutValidData = () => {
    (global.fetch as jest.Mock)
    .mockResolvedValue({
      json: async () => ({ error: 'Error' }),
    });
  };

  const mockRejectedFetch = () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce({});
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the WarningModal with the join button for a logged-in user who is not a member of a pending group', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNonMemberSession);
    mockDataFetch('pending');

    render(<GiftExchangePage />);

    const warningModal = await screen.findByTestId('warning-modal');
    const joinButton = screen.getByTestId('join-button');

    expect(warningModal).toBeInTheDocument();
    expect(joinButton).toBeInTheDocument();
  });

  it('displays the WarningModal with a Google sign-in button for users who are not signed in and not members of a pending group', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNoSession);
    mockDataFetch('pending');

    render(<GiftExchangePage />);

    const warningModal = await screen.findByTestId('warning-modal');
    const googleButton = screen.getByTestId('google-button');

    expect(warningModal).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  it('redirects to user dashboard and displays Bad Link toast if URL is invalid', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
    mockFetchWithoutValidData();

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith('/dashboard');

      expect(mockToast).toHaveBeenCalledWith(TOASTS.badLinkToast);
    });
  });

  it('displays a Server Error toast if data fetching throws an error', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
    mockRejectedFetch();

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(TOASTS.errorToast);
    });
  });

  it('redirects to the dashboard and displays an Expired Link toast if user is not a member of a group that has already had its Drawing', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNonMemberSession);
    mockDataFetch('active');

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith('/dashboard');

      expect(mockToast).toHaveBeenCalledWith(TOASTS.expiredLinkToast);
    });
  });

  it('calls signInWithGoogle function if the user is not logged in and the group has already had its Drawing', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockNoSession);
    (utils.signInWithGoogle as jest.Mock).mockResolvedValue(undefined);
    mockDataFetch('active');

    render(<GiftExchangePage />);

    await waitFor(() => {
      expect(utils.signInWithGoogle as jest.Mock).toHaveBeenCalledWith({
        redirectPath: expect.any(String),
      });
    });
  });

  it('renders the WaitingForSuggestions component when no gift suggestions are available', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
    mockDataFetch('active');
    render(<GiftExchangePage />);

    const waitingForSuggestions = await screen.findByTestId('suggestions-waiting');
    expect(waitingForSuggestions).toBeInTheDocument();

    const giftSuggestionCards = screen.queryAllByTestId('gift-suggestion-card');
    expect(giftSuggestionCards.length).toBe(0);
  })

  it('renders 3 GiftSuggestionCard components when 3 gift suggestions are available', async () => {
    (useAuthContext as jest.Mock).mockReturnValue(mockMemberSession);
    mockDataFetch('active', mockGiftSuggestionsFull);
    render(<GiftExchangePage />);

    // Verify the waiting for suggestions component is not rendering
    const waitingForSuggestions = screen.queryByTestId('suggestions-waiting');
    expect(waitingForSuggestions).not.toBeInTheDocument();

    // Verifiy 3 gift suggestions are provided
    const giftSuggestionCards = await screen.findAllByTestId('gift-suggestion-card');
    expect(giftSuggestionCards.length).toBe(3);

    // Verify each card is in the document
    giftSuggestionCards.forEach(card => {
      expect(card).toBeInTheDocument();
    });
  })
});
