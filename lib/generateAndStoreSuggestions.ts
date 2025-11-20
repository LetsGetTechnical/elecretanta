// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { SupabaseClient } from '@supabase/supabase-js';
import { openai } from '../app/api/openaiConfig/config';
import { getAmazonImage } from './getAmazonImage';
import { SupabaseError, OpenAiError } from './errors/CustomErrors';
import {
  IGeneratedSuggestionNormalized,
} from './interfaces/IGeneratedSuggestionRaw';

/**
 * Generates and store gift suggestions
 * @param {SupabaseClient} supabase - The connection to user supabase data
 * @param {string} exchangeId - The exchange Id
 * @param {string} giverId - The id for gift giver
 * @param {string} recipientId - The id for gift receiver
 * @param {number} budget - The price range for exchange
 * @returns {Promise<void>} - Promise that resolves when gifts are generated and stored
 * @throws {Error} - If it fails to provide gift suggestions
 */
export async function generateAndStoreSuggestions(
  supabase: SupabaseClient,
  exchangeId: string,
  giverId: string,
  recipientId: string,
  budget: number,
): Promise<void> {
  try {
    // Get recipient's profile
    const { data: recipientProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', recipientId)
      .single();

    if (profileError) {
      throw new SupabaseError(
        'Failed to fetch recipient profile',
        profileError.code,
        profileError,
      );
    }

    if (!recipientProfile) {
      throw new SupabaseError('Recipient profile is missing', 500);
    }

    const prompt = `Take on the role of a Secret Santa. Generate 3 personalized gift suggestions based on this profile information that I will provide you with: 
    
    Gift Budget: $${budget}
    
    Recipient's Profile:
    - Age Group: ${recipientProfile.age_group || 'Not specified'}
    - Hobbies: ${recipientProfile.hobbies || 'Not specified'}
    - Things to Avoid: ${recipientProfile.avoid || 'None specified'}
    - Categories of Interest: ${recipientProfile.categories?.join(', ') || 'Not specified'}
    
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
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini',
      temperature: 0.7,
    });

    if (!completion || !completion.choices || completion.choices.length === 0) {
      throw new OpenAiError('Failed to generate gift suggestions', 500);
    }

    let jsonContent = completion.choices[0].message.content || '';

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

    const rawItems = JSON.parse(jsonContent) as Array<Record<string, unknown>>;

    const parsedResponse = rawItems.map((item) => {

      return {
        title: String(item.title),
        price: String(item.price),
        description: String(item.description),
        matchReasons: Array.isArray(item.matchReasons)
          ? item.matchReasons.map(String)
          : [],
        matchScore: Number(item.matchScore),
      };
    });

    const imageResults = await Promise.allSettled(
      parsedResponse.map((response) => getAmazonImage(String(response.title))),
    );

    const rows = parsedResponse.map((suggestion, idx): {
      gift_exchange_id: string;
      giver_id: string;
      recipient_id: string;
      suggestion: IGeneratedSuggestionNormalized;
    } => {
      const imageResult = imageResults[idx];
      const imageUrl =
        imageResult.status === 'fulfilled' && imageResult.value.imageUrl
          ? imageResult.value.imageUrl
          : null;
      const productUrl =
        imageResult.status === 'fulfilled' && imageResult.value.productUrl
          ? imageResult.value.productUrl
          : null;

      return {
        gift_exchange_id: exchangeId,
        giver_id: giverId,
        recipient_id: recipientId,
        suggestion: {
          title: suggestion.title,
          price: suggestion.price,
          description: suggestion.description,
          matchReasons: suggestion.matchReasons,
          matchScore: suggestion.matchScore,
          imageUrl,
          productUrl,
        },
      };
    });

    const { error: insertError } = await supabase
      .from('gift_suggestions')
      .insert(rows);

    if (insertError) {
      throw new SupabaseError(
        'Failed to store suggestions',
        insertError.code,
        insertError,
      );
    }
  } catch (error) {
    throw error;
  }
}
