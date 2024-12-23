import { Card } from "../Card/card";
import { GiftSuggestionCardProps } from "@/app/types/giftSuggestion";
import { useState } from "react";
import FeedbackView from "../FeedbackView/FeedbackView";
import GiftDetailsView from "../GiftDetailsView/GiftDetailsView";

const GiftSuggestionCard: React.FC<GiftSuggestionCardProps> = ({ gift }) => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  return (
    <Card className="bg-giftSuggestionsCardBackground h-96 w-80 flex flex-col justify-between m-5">
      {isShowingFeedback ? (
        <FeedbackView handleFeedback={() => setIsShowingFeedback(false)} />
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
