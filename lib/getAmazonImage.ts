// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { GoogleError, BackendError } from './errors/CustomErrors';

/**
 * Amazon Image
 * @param {string} title - The title of the search item
 * @returns {Promise<{ imageUrl: string | null }>}
 - The image url and response status
 */
export const getAmazonImage = async (
  title: string,
): Promise<{ imageUrl: string | null }> => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const CSE_ID = process.env.GOOGLE_CSE_ID;

  const cleanTitle = title
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const searchQuery = `${cleanTitle} amazon.com product`;

  try {
    const response = await fetch(
      `https://customsearch.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(searchQuery)}&searchType=image&num=10`,
    );

    if (!response.ok) {
      throw new GoogleError(
        'Error fetching Google Search results:',
        response.status,
      );
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const amazonItems = data.items?.filter((item: any) => {
      try {
        const domain = new URL(item.image.contextLink).hostname;
        return domain.includes('amazon.');
      } catch {
        throw new BackendError('Failed to fetch valid Amazon product url', 404);
      }
    });

    // Get the first Amazon item if available
    if (amazonItems?.length > 0) {
      return {
        imageUrl: amazonItems[0].link,
      };
    }

    throw new BackendError('Failed to fetch Amazon image', 404);
  } catch (error) {
    throw error;
  }
};
