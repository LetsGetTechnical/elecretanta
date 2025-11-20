// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Amazon Image
 * @param {string} title - The title of the search item
 * @returns {Promise<{ imageUrl: string | null }>}
 - The image url and response status
 */
export const getAmazonImage = async (
  title: string,
): Promise<{ imageUrl: string | null; productUrl: string | null }> => {
  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;
  const encodedSearch = encodeURIComponent(title).replace(/%20/g, '+');
  const productUrl = `https://www.amazon.com/s?k=${encodedSearch}${affiliateTag ? `&tag=${affiliateTag}` : ''}`;
  return { imageUrl: null, productUrl };
};
