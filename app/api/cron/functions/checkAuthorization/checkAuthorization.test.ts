import { checkAuthorization } from './checkAuthorization';

describe('checkAuthorization', () => {
  const validSecret = process.env.CRON_SECRET;

  it('should return true if the authorization header is correct', async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue(`Bearer ${validSecret}`),
      },
    };

    const result = await checkAuthorization(mockRequest as any);
    expect(result).toBe(true);
  });

  it('should return false if the authorization header is missing', async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue(null),
      },
    };

    const result = await checkAuthorization(mockRequest as any);
    expect(result).toBe(false);
  });

  it('should return false if the authorization header is incorrect', async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue('Bearer wrongsecret'),
      },
    };

    const result = await checkAuthorization(mockRequest as any);
    expect(result).toBe(false);
  });
});
