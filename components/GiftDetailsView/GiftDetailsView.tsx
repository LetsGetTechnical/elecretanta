// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Button } from '../Button/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../Card/card';
import { SquareArrowOutUpRight, ThumbsDown, Gift } from 'lucide-react';
import { GiftSuggestion } from '@/app/types/giftSuggestion';
import { useState, useCallback } from 'react';
import { JSX } from 'react';

/**
 * A GiftDetailsView compoennt
 * @param {GiftSuggestion} gift - Gift suggestion being passed
 * @param {Function} handleFeedback - callback function when feedback is provided
 * @returns {JSX.Element} - The rendered GiftDetailsView element.
 */
const GiftDetailsView = ({
  gift,
  handleFeedback,
}: {
  gift: GiftSuggestion;
  handleFeedback: () => void;
}): JSX.Element => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  /**
   * Search Term details
   * @param {string} searchTerm - search term being passed in to search amazon list
   * @returns {string} - returns an encoded search string with the search term
   */
  const handleAmazonLink = ({ searchTerm }: { searchTerm: string }): string => {
    const encodedSearch = encodeURIComponent(searchTerm).replace(/%20/g, '+');
    return `https://www.amazon.com/s?k=${encodedSearch}`;
  };

  return (
    <>
      <div className="relative w-full h-40 bg-white rounded-t-md">
        {gift.imageUrl && !imageError ? (
          <img
            src={gift.imageUrl}
            alt={gift.title}
            className="w-full h-full object-contain p-2"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Gift className="w-16 h-16 text-gray-300" />
          </div>
        )}

        <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
          <div className="text-xs px-3 py-1 flex items-center justify-center font-semibold bg-giftSuggestionTextBackground text-giftSuggestionTextGreen rounded-full shadow-sm">
            {gift.matchScore}% Match
          </div>
          <div className="px-3 py-1 font-semibold text-giftSuggestionDarkGreen bg-white/90 rounded-full shadow-sm">
            {gift.price}
          </div>
        </div>
      </div>

      <CardHeader className="p-0 mx-4">
        <CardTitle className="text-base font-bold text-giftSuggestionDarkGreen">
          {gift.title}
        </CardTitle>
        <CardDescription className="text-sm text-giftSuggestionTextLightGreen">
          {gift.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 m-2 w-72 h-20 flex items-center bg-GiftSuggestionLightGreenBackground rounded-md">
        <ul className="text-xs list-disc list-inside w-full text-giftSuggestionDarkGreen ml-2 flex flex-col gap-1">
          {gift.matchReasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full">
          <a
            href={handleAmazonLink({ searchTerm: gift.title })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="text-sm w-32 h-9 bg-primaryButtonYellow hover:bg-primaryButtonYelow70"
              onClick={() => handleAmazonLink({ searchTerm: gift.title })}
            >
              <SquareArrowOutUpRight /> View
            </Button>
          </a>
          <Button
            className="text-sm w-32 h-9 text-giftSuggestionDarkGreen bg-gray-100 hover:bg-gray-200"
            onClick={handleFeedback}
          >
            <ThumbsDown />
            Not This
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default GiftDetailsView;
