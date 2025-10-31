import { processExchangeForToast, notifyAboutExchanges } from '@/lib/utils';
import { ToastVariants } from '@/components/Toast/Toast.enum';
import { GiftExchangeWithMemberCount } from '@/app/types/giftExchange';

describe('Utils test', () => {
  describe('processExchangeForToast', () => {
    const baseExchange: GiftExchangeWithMemberCount = {
      drawing_date: '',
      name: 'Office Secret Santa',
      gift_exchange_id: 'group-123',
      description: '',
      group_image: '',
      budget: '',
      exchange_date: '',
      owner_id: '',
      member_count: 1,
    };

    const mockToast = jest.fn();

    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2025-12-10T00:00:00Z'));
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should show a warning toast when draw is within 3 days', () => {
      const today = new Date('2025-12-10');
      const drawDate = new Date('2025-12-12');

      processExchangeForToast({
        exchange: { ...baseExchange, drawing_date: drawDate.toISOString() },
        toast: mockToast,
      });

      expect(mockToast).toHaveBeenCalledTimes(1);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: ToastVariants.Warning }),
      );
    });

    it('should show a success toast when draw is today', () => {
      const today = new Date('2025-12-10');
      const drawDate = new Date('2025-12-10');

      processExchangeForToast({
        exchange: { ...baseExchange, drawing_date: drawDate.toISOString() },
        toast: mockToast,
      });

      expect(mockToast).toHaveBeenCalledTimes(1);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: ToastVariants.Success }),
      );
    });

    it('should show an error toast when draw date has passed', () => {
      const today = new Date('2025-12-10');
      const drawDate = new Date('2025-12-08');

      processExchangeForToast({
        exchange: { ...baseExchange, drawing_date: drawDate.toISOString() },
        toast: mockToast,
      });

      expect(mockToast).toHaveBeenCalledTimes(1);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: ToastVariants.Error }),
      );
    });

    it('should not show a toast when draw is more than 3 days away', () => {
      const today = new Date('2025-12-10');
      const drawDate = new Date('2025-12-20');

      processExchangeForToast({
        exchange: { ...baseExchange, drawing_date: drawDate.toISOString() },
        toast: mockToast,
      });

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
});
