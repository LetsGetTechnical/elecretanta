import { SupabaseClient } from "@supabase/supabase-js";
import { openai } from "../app/api/openaiConfig/config";
import { getAmazonImage } from "./getAmazonImage";

export async function generateAndStoreSuggestions(
  supabase: SupabaseClient,
  exchangeId: string,
  giverId: string,
  recipientId: string,
  budget: number
) {
  // Get recipient's profile
  const { data: recipientProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", recipientId)
    .single();

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
    1. A title (be very specific with brand names and model numbers if applicable)
    2. An estimated price within budget
    3. A brief description
    4. 2-3 specific reasons why this matches the recipient's preferences
    5. A match score (0-100) based on how well it fits their preferences
    
    Respond with only the JSON array without any markdown formatting or additional text. The array should contain objects with fields: title, price, description, matchReasons (array), matchScore (number)`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  try {
    let jsonContent = completion.choices[0].message.content || "";
    
    // Clean up the response if it contains markdown or extra text
    if (jsonContent.includes('```')) {
      const match = jsonContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      jsonContent = match ? match[1] : jsonContent;
    }
    
    jsonContent = jsonContent.trim();
    if (!jsonContent.startsWith('[')) {
      const startIndex = jsonContent.indexOf('[');
      if (startIndex !== -1) {
        jsonContent = jsonContent.slice(startIndex);
      }
    }
    if (!jsonContent.endsWith(']')) {
      const endIndex = jsonContent.lastIndexOf(']');
      if (endIndex !== -1) {
        jsonContent = jsonContent.slice(0, endIndex + 1);
      }
    }

    const parsedResponse = JSON.parse(jsonContent);

    // Process each suggestion with Amazon data
    for (const suggestion of parsedResponse) {
      const amazonData = await getAmazonImage(suggestion.title);

      const cleanSuggestion = {
        title: String(suggestion.title),
        price: String(suggestion.price),
        description: String(suggestion.description),
        matchReasons: Array.isArray(suggestion.matchReasons)
          ? suggestion.matchReasons.map(String)
          : [],
        matchScore: Number(suggestion.matchScore),
        imageUrl: amazonData.imageUrl || null,
      };

      console.log("Cleaned suggestion:", cleanSuggestion);
      const { error: suggestionError } = await supabase
      .from("gift_suggestions")
      .insert({
        gift_exchange_id: exchangeId,
        giver_id: giverId,
        recipient_id: recipientId,
        suggestion: cleanSuggestion,
      });

    if (suggestionError) {
      console.error("Failed to store suggestion:", suggestionError);
    }
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to parse or store suggestions:", error);
    throw new Error("Failed to generate gift suggestions");
  }
}
