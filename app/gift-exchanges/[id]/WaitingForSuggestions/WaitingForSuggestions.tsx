// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { Gift, RefreshCw } from 'lucide-react';
import { Button } from '@/components/Button/button';

/**
 * Custom loading component for when gifts are being fetched.
 * @returns {JSX.Element} - The rendered WaitingForSuggestions element.
 */
export const WaitingForSuggestions = (): JSX.Element => {
  /**
   * Refreshes the page to fetch new suggestions.
   */
  const handleRefresh = (): void => {
    window.location.reload();
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center rounded-lg mt-8 bg-groupCardGreen"
      data-testid="suggestions-waiting"
    >
      <div className="animate-bounce mb-6">
        <Gift className="h-16 w-16 text-red-500" />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-white">
        The Elves Are Hard at Work! 🎄
      </h2>

      <p className="text-gray-300 mb-6 max-w-md">
        Our magical gift-suggestion engine is preparing personalized
        recommendations just for you. This might take a 30 secs to a minute.
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span>Generating thoughtful suggestions...</span>
      </div>

      <Button onClick={handleRefresh} data-testid="check-button">
        <RefreshCw className="h-4 w-4" />
        Check Again
      </Button>
    </div>
  );
};
