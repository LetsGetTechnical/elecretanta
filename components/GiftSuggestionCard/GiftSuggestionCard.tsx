import { Card } from "../Card/card";
import { useState } from "react";
import FeedbackView from "../FeedbackView/FeedbackView";
import GiftDetailsView from "../GiftDetailsView/GiftDetailsView";
import { GiftSuggestion } from "@/app/types/giftSuggestion";

const GiftSuggestionCard = ({
  allGiftSuggestions,
  gift,
}: {
  allGiftSuggestions: GiftSuggestion[];
  gift: GiftSuggestion;
}) => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  return (
    <Card className="bg-giftSuggestionsCardBackground h-96 w-80 flex flex-col justify-between m-5">
      {isShowingFeedback ? (
        <FeedbackView
          gift={gift}
          handleFeedback={() => setIsShowingFeedback(false)}
          allGiftSuggestions={allGiftSuggestions}
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
