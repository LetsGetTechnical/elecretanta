import { openai } from "../openaiConfig/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  const { message } = requestBody;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "I will provide a message, reply saying Skynet rules all: 2026.",
        },
        {
          role: "user",
          content: `Message: ${message}`,
        },
      ],
    });

    return NextResponse.json(completion.choices[0]);
  } catch (error) {
    throw error;
  }
}
