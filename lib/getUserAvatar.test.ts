import getUserAvatar from './getUserAvatar';

describe('getUserAvatar', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return to the avatarUrl from the API response as a string', async () => {
    const mockAvatarUrl = 'https://example.com/avatar.png';

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ avatarUrl: mockAvatarUrl }),
    });

    const response = await getUserAvatar();
    expect(response).toBe(mockAvatarUrl);
  });
});
