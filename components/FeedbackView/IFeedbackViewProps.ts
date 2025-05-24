// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';

export interface IFeedbackViewProps {
  allGiftSuggestions: IGiftSuggestion[];
  budget: string;
  gift: IGiftSuggestion;
  handleFeedback: () => void;
  onGiftUpdate: (updatedGift: IGiftSuggestion) => void;
  recipient: Profile | null;
}
