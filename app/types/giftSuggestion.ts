export interface GiftSuggestion {
  id: string;
  title: string;
  price: string;
  description: string;
  matchReasons: string[];
  matchScore: number;
}

export interface GiftSuggestionCardProps {
  gift: GiftSuggestion;
}
