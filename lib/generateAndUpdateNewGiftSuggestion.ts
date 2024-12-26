import { openai } from "@/app/api/openaiConfig/config";
import { GiftSuggestion } from "@/app/types/giftSuggestion";
import { Profile } from "@/app/types/profile";
import { createClient } from "./supabase/server";
import { NextResponse } from "next/server";

export async function generateAndUpdateNewGiftSuggestion(
  allGiftSuggestions: GiftSuggestion[],
  budget: string,
  feedback: string,
  gift: GiftSuggestion,
  recipient: Profile | null
) {
  if (!recipient) {
    return NextResponse.json(
      { error: "Recipient profile is missing" },
      { status: 400 }
    );
  }

  const prompt = `You have been taking on the role of a Secret Santa. Previously, you generated 3 gift suggestions based on this profile information that I will provide you with:
  
    Gift Budget: $${budget}

    Recipient's Profile:
    - Age Group: ${recipient.age_group || "Not specified"}
    - Hobbies: ${recipient.hobbies || "Not specified"}
    - Things to Avoid: ${recipient.avoid || "Not specified"}
    - Categories of Interest: ${
      recipient.categories?.join(",") || "Not specified"
    }

    Preference Scales (0-100):
    - Practical vs Whimsical: ${recipient.practical_whimsical}
    - Cozy vs Adventurous: ${recipient.cozy_adventurous}
    - Minimal vs Luxurious: ${recipient.minimal_luxurious}

    With this profile information, you generated these 3 gifts:
    - Gifts: ${allGiftSuggestions}

    Generate 1 new gift suggestion to replace the gift I will provide you with along with the feedback it recieved:
    - Gift: ${gift}
    - Feedback: ${feedback}

    For the replacement suggestion, provide:
    1. A title
    2. An estimated price within budget
    3. A brief description
    4. 2 specific reasons why this matches the recipient's preferences
    5. A match score (0-100) based on how well it fits their preferences

    Format as JSON array with fields: title, price, description, matchReasons (array), matchScore (number)`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
