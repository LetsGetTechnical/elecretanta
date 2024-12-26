import { Card } from "../Card/card";
import { useState } from "react";
import FeedbackView from "../FeedbackView/FeedbackView";
import GiftDetailsView from "../GiftDetailsView/GiftDetailsView";
import { GiftSuggestion } from "@/app/types/giftSuggestion";
import { Profile } from "@/app/types/profile";

const GiftSuggestionCard = ({
  allGiftSuggestions,
  budget,
  gift,
  recipient,
}: {
  allGiftSuggestions: GiftSuggestion[];
  budget: string;
  gift: GiftSuggestion;
  recipient: Profile | null;
}) => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  return (
    <Card className="bg-giftSuggestionsCardBackground h-96 w-80 flex flex-col justify-between m-5">
      {isShowingFeedback ? (
        <FeedbackView
          allGiftSuggestions={allGiftSuggestions}
          budget={budget}
          gift={gift}
          handleFeedback={() => setIsShowingFeedback(false)}
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
