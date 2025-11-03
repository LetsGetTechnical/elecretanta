// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { useState, useEffect } from 'react';
import { GiftExchangeWithMemberCount } from '../app/types/giftExchange';

/**
 * A React hook that manages the current users exchange groups.
 * @returns {array} An array containing the current list of user gift exchange groups.
 */

const useUserOwnedGroups = () => {
  const [giftExchanges, setGiftExchanges] = useState<
      GiftExchangeWithMemberCount[]
    >([]);

  useEffect(() => {
    async function fetchGiftExchanges() {
      try {
        const response = await fetch(`/api/gift-exchanges`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGiftExchanges(data);

      } catch (error) {
        console.error('Failed to fetch gift exchanges:', error);
      }
    }
    fetchGiftExchanges();
  }, []);

  return giftExchanges;

};

export default useUserOwnedGroups;
