import { GiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';

export interface IFeedbackViewProps {
  allGiftSuggestions: GiftSuggestion[];
  budget: string;
  gift: GiftSuggestion;
  handleFeedback: () => void;
  onGiftUpdate: (updatedGift: GiftSuggestion) => void;
  recipient: Profile | null;
}
