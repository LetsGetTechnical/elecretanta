import { openai } from "../openaiConfig/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  const { profile } = requestBody;

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
          - Title and approximate price range
          - Brief description
          - 3 reasons why it matches the profile
          - Match percentage

          Format as JSON with fields: title, price, description, matchReasons[], matchScore.
          `,
        },
        {
          role: "user",
          content: `Name: ${profile.name}, Age: ${profile.age}, Interests: ${profile.interests}, Style: ${profile.style}, Budget: ${profile.budget}, Avoid: ${profile.avoid}`,
        },
      ],
    });

    return NextResponse.json(completion.choices[0]);
  } catch (error) {
    throw error;
  }
}
