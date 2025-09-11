// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export const getAmazonImage = async (title: string) => {
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
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const amazonItems = data.items?.filter((item: any) => {
      try {
        const domain = new URL(item.image.contextLink).hostname;
        return domain.includes('amazon.');
      } catch {
        return false;
      }
    });

    // Get the first Amazon item if available
    if (amazonItems?.length > 0) {
      return {
        imageUrl: amazonItems[0].link,
        success: true,
      };
    }

    return { success: false, imageUrl: null };
  } catch (error) {
    console.error('Failed to fetch Amazon image:', error);
    return { success: false, imageUrl: null };
  }
};
