// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Interface for a gift suggestion.
 * @typedef {object} GiftSuggestion
 * @property {string} id - The unique identifier for the gift suggestion.
 * @property {string} title - The title of the gift suggestion.
 * @property {string} price - The price of the gift suggestion.
 * @property {string} description - The description of the gift suggestion.
 * @property {string[]} matchReasons - An array of reasons why the gift suggestion matches the profile.
 * @property {number} matchScore - The match score of the gift suggestion.
 * @property {string | null} imageUrl - The image URL of the gift suggestion.
 */
export interface GiftSuggestion {
  id: string;
  title: string;
  price: string;
  description: string;
  matchReasons: string[];
  matchScore: number;
  imageUrl: string | null;
}
