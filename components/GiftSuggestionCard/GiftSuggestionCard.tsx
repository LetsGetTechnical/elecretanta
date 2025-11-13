import { Card } from '../Card/Card';
import { useState } from 'react';
import FeedbackView from '../FeedbackView/FeedbackView';
import GiftDetailsView from '../GiftDetailsView/GiftDetailsView';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';

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
}) => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  const handleGiftUpdate = async (updatedGift: IGiftSuggestion) => {
    onGiftUpdate(updatedGift, index);
    setIsShowingFeedback(false);
  };

  return (
    <Card className="bg-giftSuggestionsCardBackground h-100 w-80 flex flex-col justify-between m-5" data-testid="gift-suggestion-card">
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
