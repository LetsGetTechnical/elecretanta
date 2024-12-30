export interface GiftSuggestion {
  id: string;
  title: string;
  price: string;
  description: string;
  matchReasons: string[];
  matchScore: number;
  imageUrl: string | null;
}
