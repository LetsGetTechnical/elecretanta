// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Card } from '../Card/Card';
import { useState, JSX } from 'react';
import FeedbackView from '../FeedbackView/FeedbackView';
import GiftDetailsView from '../GiftDetailsView/GiftDetailsView';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';

/**
 * The Gift Suggestion Component for display gift or feedback
 * @param {object} giftSuggestionParams - The gift object all the params are associated with.
 * @param {IGiftSuggestion[]} giftSuggestionParams.allGiftSuggestions - the Array of all the gift suggestions.
 * @param {string} giftSuggestionParams.budget - the exchange budget for gift.
 * @param {IGiftSuggestion} giftSuggestionParams.gift - the gift suggestion.
 * @param {number} giftSuggestionParams.index - the index of the gift.
 * @param {IGiftSuggestion | number} giftSuggestionParams.onGiftUpdate - the updated value of index and gift suggestion.
 * @param {Profile | null} giftSuggestionParams.recipient - The user information for gift recipient.
 * @returns {JSX.Element} - The gift suggestion card component.
 */
const GiftSuggestionCard = ({
  allGiftSuggestions,
  budget,
  gift,
  index,
  onGiftUpdate,
  recipient,
}: {
  allGiftSuggestions: IGiftSuggestion[];
  budget: string;
  gift: IGiftSuggestion;
  index: number;
  onGiftUpdate: (updatedGift: IGiftSuggestion, index: number) => void;
  recipient: Profile | null;
}): JSX.Element => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  /**
   * Handles updating gift suggestion for user
   * @param {IGiftSuggestion} updatedGift - the updated gift value
   * @returns {Promise<void>} - sets state and updated gift values
   */
  const handleGiftUpdate = async (
    updatedGift: IGiftSuggestion,
  ): Promise<void> => {
    onGiftUpdate(updatedGift, index);
    setIsShowingFeedback(false);
  };

  return (
    <Card className="bg-giftSuggestionsCardBackground h-100 w-80 flex flex-col justify-between m-5">
      {isShowingFeedback ? (
        <FeedbackView
          allGiftSuggestions={allGiftSuggestions}
          budget={budget}
          gift={gift}
          handleFeedback={() => setIsShowingFeedback(false)}
          onGiftUpdate={handleGiftUpdate}
          recipient={recipient}
        />
      ) : (
        <GiftDetailsView
          gift={gift}
          handleFeedback={() => setIsShowingFeedback(true)}
        />
      )}
    </Card>
  );
};

export default GiftSuggestionCard;
