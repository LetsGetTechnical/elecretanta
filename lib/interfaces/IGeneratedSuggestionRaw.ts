// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface IGeneratedSuggestionRaw {
  title: string;
  price: string | number; // OpenAI may return number or formatted string
  description: string;
  matchReasons: string[]; // Ensure array shape
  matchScore: number; // 0-100
}

// Normalized shape we persist (after coercion / enrichment)
export interface IGeneratedSuggestionNormalized {
  title: string;
  price: string; // stored consistently as string
  description: string;
  matchReasons: string[];
  matchScore: number;
  imageUrl: string | null;
  productUrl: string | null; // direct Amazon product detail page
}
