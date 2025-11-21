// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { IGiftSuggestion } from '@/app/types/giftSuggestion';

export interface IGiftDetailsViewProps {
  gift: IGiftSuggestion;
  handleFeedback: () => void;
}
