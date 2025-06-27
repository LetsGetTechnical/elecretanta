// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { ChevronLeft } from 'lucide-react';
import ButtonGroup from './ButtonGroup';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';
import { generateAndUpdateNewGiftSuggestion } from '@/lib/generateAndUpdateNewGiftSuggestion';
import { useState, JSX } from 'react';
import { IFeedbackViewProps } from './IFeedbackViewProps';

/**
 * Component that creates feedback view and handles userfeedback. It is used in GiftSuggestionCard.tsx.
 * Component that creates feedback view and handles userfeedback. It is used in GiftSuggestionCard.tsx.
 * @param {object} props - The component props
 * @param {IGiftSuggestion[]} props.allGiftSuggestions - The list of all gift suggestions for this recipient.
 * @param {string} props.budget - The budget for the gift to be passed on to AI to generate suggestions.
 * @param {IGiftSuggestion} props.gift - The selected gift that the user is providing feedback on.
 * @param {() => void} props.handleFeedback - The function to update gift recommendations based on user feedback.
 * @param {(updatedGift: IGiftSuggestion) => void} props.onGiftUpdate - The function to update the gift suggestion.
 * @param {Profile | null} props.recipient - Contains the recipients info to pass on to AI to generate suggestions.
 * @returns {JSX.Element} The rendered feedback view component
 */
const FeedbackView = ({
  allGiftSuggestions,
  budget,
  gift,
  handleFeedback,
  onGiftUpdate,
  recipient,
}: IFeedbackViewProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buttonVariants = [
    {
      title: 'Too Expensive',
      subtitle: 'Show lower price range',
      id: 'expensive',
    },
    {
      title: 'Not Their Style',
      subtitle: 'Try different interests',
      id: 'style',
    },
    {
      title: 'They Might Have This',
      subtitle: 'Show alternatives',
      id: 'alternative',
    },
  ];
  /**
   * Updates gift recommendations based on user feedback.
   * @param {string} feedback - The feedback to submit.
   * @returns {Promise<void>} - A promise that resolves to void when the gift suggestion is updated.
   */
  const handleFeedbackSubmit = async (feedback: string): Promise<void> => {
    setIsLoading(true);
    try {
      const updatedGift = await generateAndUpdateNewGiftSuggestion(
        allGiftSuggestions,
        budget,
        feedback,
        gift,
        recipient,
      );
      if (updatedGift) {
        onGiftUpdate(updatedGift);
      } else {
        console.error('Failed to update gift suggestion');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col m-4 h-full" data-testid="feedback-view">
      {isLoading ? (
        <div
          className="flex justify-center items-center h-full"
          data-testid="feedbackView__loading"
        >
          <div className="border-t-4 border-red-500 border-solid w-12 h-12 rounded-full animate-spin" />
        </div>
      ) : (
        <div
          className="flex flex-col m-4 h-full"
          data-testid="feedbackView__loading"
        >
          <ChevronLeft
            className="hover:cursor-pointer"
            onClick={handleFeedback}
          />
          <h1 className="text-sm text-[#21443D] font-bold mx-auto mt-4">
            Give Us Feedback
          </h1>
          <ButtonGroup
            variants={buttonVariants}
            handleFeedbackSubmit={handleFeedbackSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default FeedbackView;
