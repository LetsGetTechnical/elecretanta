import { Card } from '../Card2/Card';
import { useState } from 'react';
import FeedbackView from '../FeedbackView/FeedbackView';
import GiftDetailsView from '../GiftDetailsView/GiftDetailsView';
import { GiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';

const GiftSuggestionCard = ({
  allGiftSuggestions,
  budget,
  gift,
  index,
  onGiftUpdate,
  recipient,
}: {
  allGiftSuggestions: GiftSuggestion[];
  budget: string;
  gift: GiftSuggestion;
  index: number;
  onGiftUpdate: (updatedGift: GiftSuggestion, index: number) => void;
  recipient: Profile | null;
}) => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  const handleGiftUpdate = async (updatedGift: GiftSuggestion) => {
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
