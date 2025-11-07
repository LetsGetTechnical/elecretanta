'use client';

import { useEffect, useState, useCallback } from 'react';
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
  const [isPolling, setIsPolling] = useState(false);

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

  const fetchGiftSuggestions = useCallback(async () => {
    try {
      const response = await fetch(`/api/gift-exchanges/${id}/giftSuggestions`);
      const result = await response.json();
      
      if (result.suggestions) {
        setGiftSuggestions(result.suggestions);
        
        // Stop polling if we have suggestions
        if (result.suggestions.length > 2) {
          console.log('Stopping poll - suggestions loaded');
          setIsPolling(false);
        }
      }
    } catch (error) {
      console.error('Error fetching gift suggestions:', error);
    }
  }, [id]);

  console.log('checking polling...')
  console.log(isPolling)

  // Start polling if we have no suggestions
  useEffect(() => {
    if (giftSuggestions.length === 0 && !isPolling) {
      setIsPolling(true);
    }
  }, [giftSuggestions.length, isPolling]);

  // Polling interval effect - only polls for suggestions
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPolling) {
      intervalId = setInterval(() => {
        fetchGiftSuggestions();
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPolling, fetchGiftSuggestions]);

  // Update suggestions when initial suggestions change
  useEffect(() => {
    setGiftSuggestions(initialSuggestions);
  }, [initialSuggestions]);

  return (
    <section className="flex flex-col">
      <h1 className="font-bold">Gift Suggestions</h1>
      {giftSuggestions?.length === 0 && <WaitingForSuggestions />}

      {giftSuggestions?.length !== 0 && (
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