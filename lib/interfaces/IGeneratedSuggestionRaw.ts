// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface IGeneratedSuggestionNormalized {
  title: string;
  price: string;
  description: string;
  matchReasons: string[];
  matchScore: number;
  imageUrl: string | null;
  productUrl: string | null; // direct Amazon product detail page
}
