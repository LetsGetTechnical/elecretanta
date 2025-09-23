import { Button } from '../Button/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../Card/Card';
import {
  SquareArrowOutUpRight,
  ThumbsDown,
  Gift as GiftIcon,
} from 'lucide-react';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { useState, useCallback } from 'react';

const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

const GiftDetailsView = ({
  gift,
  handleFeedback,
}: {
  gift: IGiftSuggestion;
  handleFeedback: () => void;
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleAmazonLink = ({ searchTerm }: { searchTerm: string }) => {
    const encodedSearch = encodeURIComponent(searchTerm).replace(/%20/g, '+');

    return `https://www.amazon.com/s?k=${encodedSearch}&tag=${process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG}`;
  };

  const showImage = gift.imageUrl && isValidUrl(gift.imageUrl) && !imageError;
  const matchScore = `${gift.matchScore}% Match`;

  return (
    <>
      <div className="relative w-full h-40 bg-white rounded-t-md">
        {showImage ? (
          <img
            src={gift.imageUrl ? gift.imageUrl : ''}
            alt={gift.title}
            className="w-full h-full object-contain p-2"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GiftIcon
              role="img"
              className="w-16 h-16 text-gray-300"
              aria-label="gift placeholder image"
            />
          </div>
        )}

        <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
          <div
            role="score"
            aria-label="match score"
            className="text-xs px-3 py-1 flex items-center justify-center font-semibold bg-giftSuggestionTextBackground text-giftSuggestionTextGreen rounded-full shadow-sm"
          >
            {matchScore}
          </div>
          <data
            value={gift.price}
            aria-label="price"
            className="px-3 py-1 font-semibold text-giftSuggestionDarkGreen bg-white/90 rounded-full shadow-sm"
          >
            {gift.price}
          </data>
        </div>
      </div>

      <CardHeader className="p-0 mx-4">
        <CardTitle>
          <h3 className="text-base font-bold text-giftSuggestionDarkGreen">
            {gift.title}
          </h3>
        </CardTitle>
        <CardDescription className="text-sm text-giftSuggestionTextLightGreen">
          {gift.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 m-2 w-72 h-20 flex items-center bg-GiftSuggestionLightGreenBackground rounded-md">
        <ul
          aria-label="match reasons"
          className="text-xs list-disc list-inside w-full text-giftSuggestionDarkGreen ml-2 flex flex-col gap-1"
        >
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
              className="text-sm w-32 h-9 bg-primaryButtonYellow hover:bg-primaryButtonYellow70"
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
