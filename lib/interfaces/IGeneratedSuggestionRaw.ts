// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface IGeneratedSuggestionRaw {
  title: string;
  price: string;
  description: string;
  matchReasons: string[];
  matchScore: number;
}

// Normalized shape we persist (after coercion / enrichment)
export interface IGeneratedSuggestionNormalized {
  title: string;
  price: string;
  description: string;
  matchReasons: string[];
  matchScore: number;
  imageUrl: string | null;
}
