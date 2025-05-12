// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { GiftSuggestion } from '@/app/types/giftSuggestion';

export interface IGiftDetailsViewProps {
  gift: GiftSuggestion;
  handleFeedback: () => void;
}
