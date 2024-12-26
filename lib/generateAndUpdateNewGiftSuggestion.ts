import { SupabaseClient } from "@supabase/supabase-js";
import { openai } from "@/app/api/openaiConfig/config";
import { GiftSuggestion } from "@/app/types/giftSuggestion";
import { Profile } from "@/app/types/profile";

export async function generateAndUpdateNewGiftSuggestion(
  allGiftSuggestions: GiftSuggestion[],
  budget: string,
  gift: GiftSuggestion,
  recipient: Profile,
  supabase: SupabaseClient
) {
  const prompt = `You have been taking on the role of a Secret Santa. Previously, you generated 3 gift suggestions based on this profile information that I will provide you with:
  
    Gift Budget: $${budget}

    Recipient's Profile:
    - Age Group: ${recipient.age_group || "Not specified"}
    - Hobbies: ${recipient.hobbies || "Not specified"}
    - Things to Avoid: 
    - Categories of Interest: 
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  try {
    const parsedResponse = JSON.parse(
      completion.choices[0].message.content || ""
    );

    for (const suggestion of parsedResponse) {
      const cleanSuggestion = {
        title: String(suggestion.title),
        price: String(suggestion.price),
        description: String(suggestion.description),
        matchReasons: Array.isArray(suggestion.matchReasons)
          ? suggestion.matchReasons.map(String)
          : [],
        matchScore: Number(suggestion.matchScore),
      };

      const { error: suggestionError } = await supabase
        .from("gift_suggestions")
        .update({ suggestion: cleanSuggestion })
        .eq("id", gift.id);

      if (suggestionError) {
        console.error("Failed to update suggestion:", suggestionError);
      }
    }
  } catch (error) {
    throw error;
  }
}
