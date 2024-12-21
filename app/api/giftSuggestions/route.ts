import { SupabaseClient } from "@supabase/supabase-js";
import { openai } from "../openaiConfig/config";
import { NextResponse } from "next/server";

export async function POST() {
  // const requestBody = await req.json();

  // const { profile } = requestBody;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Take on the role of a Secret Santa. Generate 3 personalized gift suggestions based on this profile information that I will provide you with:
          
          Recipient:
          - Name
          - Age
          - Interests
          - Style
          - Budget
          - Avoid

          For each suggestion, provide:
          - Short Title of Gift
          - Price range of gift
          - Brief description
          - 2 short reasons why it matches the profile
          - Match percentage

          Format as JSON with fields: title, price, description, matchReasons[], matchScore.
          `,
        },
        {
          role: "user",
          // content: `Name: ${profile.name}, Age: ${profile.age}, Interests: ${profile.interests}, Style: ${profile.style}, Budget: ${profile.budget}, Avoid: ${profile.avoid}`,
          content: `Name: Jack, Age: 25, Interests: Cooking and Athletics, Style: Practicall, Budget: $50, Avoid: Candy and Peanuts`,
        },
      ],
    });

    return NextResponse.json(completion.choices[0]);
  } catch (error) {
    throw error;
  }
}

export async function generateAndStoreSuggestions(
  supabase: SupabaseClient,
  exchangeId: string,
  giverId: string,
  recipientId: string,
  budget: number
) {
  console.log("budget", budget);
  // Get recipient's profile
  const { data: recipientProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", recipientId)
    .single();

  console.log("recipientProfile", recipientProfile);
  if (profileError || !recipientProfile) {
    throw new Error("Failed to fetch recipient profile");
  }

  const prompt = `Take on the role of a Secret Santa. Generate 3 personalized gift suggestions based on this profile information that I will provide you with: 
  
  Gift Budget: $${budget}
  
  Recipient's Profile:
  - Age Group: ${recipientProfile.age_group || "Not specified"}
  - Hobbies: ${recipientProfile.hobbies || "Not specified"}
  - Things to Avoid: ${recipientProfile.avoid || "None specified"}
  - Categories of Interest: ${
    recipientProfile.categories?.join(", ") || "Not specified"
  }
  
  Preference Scales (0-100):
  - Practical vs Whimsical: ${recipientProfile.practical_whimsical}
  - Cozy vs Adventurous: ${recipientProfile.cozy_adventurous}
  - Minimal vs Luxurious: ${recipientProfile.minimal_luxurious}

  For each suggestion, provide:
  1. A title
  2. An estimated price within budget
  3. A brief description
  4. 2-3 specific reasons why this matches the recipient's preferences
  5. A match score (0-100) based on how well it fits their preferences
  
  Format as JSON array with fields: title, price, description, matchReasons (array), matchScore (number)`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  const response = completion.choices[0].message.content || "";
  const suggestions = response.split("\n").filter((s) => s.trim());

  console.log("Suggestions:", suggestions);
  // Store each suggestion
  for (const suggestion of suggestions) {
    const { error: suggestionError } = await supabase
      .from("gift_suggestions")
      .insert({
        gift_exchange_id: exchangeId,
        giver_id: giverId,
        recipient_id: recipientId,
        suggestion: JSON.stringify(suggestion), // Store the entire suggestion object
      });

    if (suggestionError) {
      console.error("Failed to store suggestion:", suggestionError);
    }
  }

  return { success: true };
}
