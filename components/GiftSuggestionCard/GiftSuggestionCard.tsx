import { Card } from "../Card/card";
import { GiftSuggestionCardProps } from "@/app/types/giftSuggestion";
import { useState } from "react";
import FeedbackView from "../FeedbackView/FeedbackView";
import GiftDetailsView from "../GiftDetailsView/GiftDetailsView";

const GiftSuggestionCard: React.FC<GiftSuggestionCardProps> = ({ gift }) => {
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  const renderView = () => {
    if (isShowingFeedback) {
      return (
        <FeedbackView handleFeedback={() => setIsShowingFeedback(false)} />
      );
    } else {
      return (
        <GiftDetailsView
          gift={gift}
          handleFeedback={() => setIsShowingFeedback(true)}
        />
      );
    }
  };
  return (
    <Card className="bg-giftSuggestionsCardBackground h-96 w-80 flex flex-col justify-between m-5">
      {renderView()}
    </Card>
  );
};

export default GiftSuggestionCard;
