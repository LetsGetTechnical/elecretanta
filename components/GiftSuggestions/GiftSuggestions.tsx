'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';
import GiftSuggestionCard from '@/components/GiftSuggestionCard/GiftSuggestionCard';
import { WaitingForSuggestions } from '@/app/gift-exchanges/[id]/WaitingForSuggestions/WaitingForSuggestions';

interface GiftSuggestionsProps {
  id: string;
  giftMatch: Profile | null;
  budget: string;
  initialSuggestions: IGiftSuggestion[];
}

export const GiftSuggestions = ({ 
  id, 
  giftMatch, 
  budget, 
  initialSuggestions 
}: GiftSuggestionsProps) => {
  const [giftSuggestions, setGiftSuggestions] = useState<IGiftSuggestion[]>(initialSuggestions);
  const [isGenerating, setIsGenerating] = useState(false);
  const hasTriggeredGeneration = useRef(false);

  const handleGiftUpdate = (
    updatedGift: IGiftSuggestion,
    originalIndex: number,
  ) => {
    setGiftSuggestions((prevSuggestions) => {
      const newSuggestions = [...prevSuggestions];
      newSuggestions[originalIndex] = updatedGift;
      return newSuggestions;
    });
  };

  // Trigger suggestion generation when component mounts with empty suggestions
  useEffect(() => {
    if (giftSuggestions.length === 0 && !isGenerating && !hasTriggeredGeneration.current) {
      hasTriggeredGeneration.current = true;
      setIsGenerating(true);
      
      fetch(`/api/gift-exchanges/${id}/generate-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        console.log('printing the data from return promse...')
        console.log(data)
        if (data.success && data.suggestions) {
          // Update state with the 3 suggestions
          setGiftSuggestions(data.suggestions);
        }
        setIsGenerating(false);
      })
      .catch(error => {
        console.error('Suggestion generation failed:', error);
        setIsGenerating(false);
      });
    }
  }, [giftSuggestions.length, id, isGenerating]);

  console.log('outputting gift suggestions')
  console.log(giftSuggestions)

  return (
    <section className="flex flex-col">
      <h1 className="font-bold">Gift Suggestions</h1>
      {(!giftSuggestions || giftSuggestions?.length === 0) && <WaitingForSuggestions />}

      {giftSuggestions && giftSuggestions?.length > 2 && (
        <div className="flex flex-row flex-wrap">
          {giftSuggestions.map((gift, index) => (
            <GiftSuggestionCard
              allGiftSuggestions={giftSuggestions}
              budget={budget}
              gift={gift}
              index={index}
              key={gift.id}
              onGiftUpdate={handleGiftUpdate}
              recipient={giftMatch}
            />
          ))}
        </div>
      )}
    </section>
  );
};