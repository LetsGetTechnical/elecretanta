// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { openai } from '@/app/api/openaiConfig/config';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { Profile } from '@/app/types/profile';
import { createClient } from './supabase/server';
import { getAmazonImage } from './getAmazonImage';
import {
  BackendError,
  OpenAiError,
  SupabaseError,
} from './errors/CustomErrors';

/**
 *
 * Function to generate a gift suggestion, and update the gift suggestion with the generated suggestion
 * @param {IGiftSuggestion[]} allGiftSuggestions - List of gift suggestions.
 * @param {string} budget - Gift budget.
 * @param {string} feedback - Feedback for new gift suggestion.
 * @param {IGiftSuggestion} gift - Single gift suggestion.
 * @param {Profile | null} recipient - Profile of recipient.
 * @returns {IGiftSuggestion} - Updated gift suggestion.
 */
export async function generateAndUpdateNewGiftSuggestion(
  allGiftSuggestions: IGiftSuggestion[],
  budget: string,
  feedback: string,
  gift: IGiftSuggestion,
  recipient: Profile | null,
): Promise<IGiftSuggestion> {
  if (!recipient) {
    throw new BackendError('Recipient profile is missing', 500);
  }

  try {
    const formattedGiftSuggestions = allGiftSuggestions
      .map((suggestion, index) => {
        return `Gift ${index + 1}: 
          - Title: ${suggestion.title}
          - Price: $${suggestion.price}
          - Description: ${suggestion.description}
          - Match Score: ${suggestion.matchScore}
          - Match Reasons: ${suggestion.matchReasons.join(', ')}
          `;
      })
      .join('\n');

    const prompt = `You have been taking on the role of a Secret Santa. Previously, you generated 3 gift suggestions based on this profile information that I will provide you with:
  
    Gift Budget: $${budget}

    Recipient's Profile:
    - Age Group: ${recipient.age_group || 'Not specified'}
    - Hobbies: ${recipient.hobbies || 'Not specified'}
    - Things to Avoid: ${recipient.avoid || 'Not specified'}
    - Categories of Interest: ${recipient.categories?.join(',') || 'Not specified'}

    Preference Scales (0-100):
    - Practical vs Whimsical: ${recipient.practical_whimsical}
    - Cozy vs Adventurous: ${recipient.cozy_adventurous}
    - Minimal vs Luxurious: ${recipient.minimal_luxurious}

    With this profile information, you generated these 3 gifts:
    - Gifts: ${allGiftSuggestions}

    Generate 1 new gift suggestion to replace the gift I will provide you with along with the feedback it recieved. Please do not generate anything closely related to the provided gift:
    - Gift: ${formattedGiftSuggestions}
    - Feedback: ${feedback}

    For the replacement suggestion, provide:
    1. A title
    2. An estimated price within budget
    3. A brief description
    4. 2 specific reasons why this matches the recipient's preferences
    5. A match score (0-100) based on how well it fits their preferences

    Format as JSON array with fields: title, price, description, matchReasons (array), matchScore (number)`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    });

    if (!completion || !completion.choices || completion.choices.length === 0) {
      throw new OpenAiError('Failed to generate gift suggestions', 500);
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      const statusCode = userError.status || 500;
      throw new SupabaseError('Failed to fetch user', statusCode, userError);
    }

    if (!user) {
      throw new SupabaseError('User is not authenticated or exists', 500);
    }

    const parsedResponse = JSON.parse(
      completion.choices[0].message.content || '',
    );

    const suggestion = parsedResponse[0];
    const amazonData = await getAmazonImage(suggestion.title);

    const cleanSuggestion: IGiftSuggestion = {
      id: gift.id,
      title: String(suggestion.title),
      price: String(suggestion.price),
      description: String(suggestion.description),
      matchReasons: Array.isArray(suggestion.matchReasons)
        ? suggestion.matchReasons.map(String)
        : [],
      matchScore: Number(suggestion.matchScore),
      imageUrl: amazonData.imageUrl || null,
    };

    const { error: suggestionError } = await supabase
      .from('gift_suggestions')
      .update({ suggestion: cleanSuggestion })
      .eq('id', gift.id);

    if (suggestionError) {
      throw new SupabaseError(
        'Failed to update suggestion',
        suggestionError.code,
        suggestionError,
      );
    }

    return cleanSuggestion;
  } catch (error) {
    throw error;
  }
}
