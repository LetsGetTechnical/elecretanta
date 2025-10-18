import { processExchangeForToast, notifyAboutExchanges } from '@/lib/utils';
import { ToastVariants } from '@/components/Toast/Toast.enum';

interface GiftExchangeWithMemberCount {
  drawing_date: string;
  name: string;
  gift_exchange_id: string;
}

describe('processExchangeForToast', () => {
  const baseExchange: GiftExchangeWithMemberCount = {
    drawing_date: '',
    name: 'Office Secret Santa',
    gift_exchange_id: 'group-123',
  };

  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show a warning toast when draw is within 3 days', () => {
    const today = new Date('2025-12-10');
    const drawDate = new Date('2025-12-12');

    processExchangeForToast(
      {
        ...baseExchange,
        drawing_date: drawDate.toISOString(),
        description: '',
        group_image: '',
        budget: '',
        exchange_date: '',
        owner_id: '',
        member_count: 0,
      },
      mockToast,
      today,
    );

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: ToastVariants.Warning,
        title: expect.stringContaining('Upcoming Draw'),
        description: expect.stringContaining('2 day'),
        group: baseExchange.gift_exchange_id,
      }),
    );
  });

  it('should show a success toast when draw is today', () => {
    const today = new Date('2025-12-10');
    const drawDate = new Date('2025-12-10');

    processExchangeForToast(
      {
        ...baseExchange,
        drawing_date: drawDate.toISOString(),
        description: '',
        group_image: '',
        budget: '',
        exchange_date: '',
        owner_id: '',
        member_count: 0,
      },
      mockToast,
      today,
    );

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: ToastVariants.Success,
        title: expect.stringContaining('Draw Today'),
        group: baseExchange.gift_exchange_id,
      }),
    );
  });

  it('should show an error toast when draw date has passed', () => {
    const today = new Date('2025-12-10');
    const drawDate = new Date('2025-12-08');

    processExchangeForToast(
      {
        ...baseExchange,
        drawing_date: drawDate.toISOString(),
        description: '',
        group_image: '',
        budget: '',
        exchange_date: '',
        owner_id: '',
        member_count: 0,
      },
      mockToast,
      today,
    );

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: ToastVariants.Error,
        title: expect.stringContaining('Draw date has passed'),
        group: baseExchange.gift_exchange_id,
      }),
    );
  });

  it('should not show a toast when draw is more than 3 days away', () => {
    const today = new Date('2025-12-10');
    const drawDate = new Date('2025-12-20');

    processExchangeForToast(
      {
        ...baseExchange,
        drawing_date: drawDate.toISOString(),
        description: '',
        group_image: '',
        budget: '',
        exchange_date: '',
        owner_id: '',
        member_count: 0,
      },
      mockToast,
      today,
    );

    expect(mockToast).not.toHaveBeenCalled();
  });
});

describe('notifyAboutExchanges', () => {
  const mockToast = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-12-10T00:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call processExchangeForToast for each exchange', () => {
    const exchanges = [
      { drawing_date: '2025-12-10', name: 'Group A', gift_exchange_id: '1' },
      { drawing_date: '2025-12-12', name: 'Group B', gift_exchange_id: '2' },
    ];

    notifyAboutExchanges(exchanges as any, mockToast);

    expect(mockToast).toHaveBeenCalledTimes(2);
  });
});
