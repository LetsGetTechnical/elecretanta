import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { generateAndStoreSuggestions } from '@/lib/generateAndStoreSuggestions';

/**
 * API Route for generating gift suggestions
 * POST /api/gift-exchanges/[id]/generate-suggestions
 */

export async function POST(req: Request, props: { params: { id: string } }) {

  const params = await props.params;
  const id = params.id;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check for existing suggestions first
    const { data: existingSuggestions } = await supabase
      .from('gift_suggestions')
      .select('id')
      .eq('gift_exchange_id', id);

    if (existingSuggestions && existingSuggestions.length > 0) {      
      // Return existing suggestions for current user
      const { data: suggestions } = await supabase
        .from('gift_suggestions')
        .select('*')
        .eq('gift_exchange_id', id)
        .eq('giver_id', user.id);

      return NextResponse.json({ 
        success: true, 
        suggestions: suggestions || [] 
      });
    }

    // Get gift exchange group and verify ownership
    const { data: exchange, error: exchangeError } = await supabase
      .from('gift_exchanges')
      .select('*')
      .eq('id', id)
      .single();

    if (exchangeError || !exchange) {
      throw new Error('Gift exchange not found');
    }    

    // Get all members who have been drawn (have recipient assignments)
    const { data: members, error: membersError } = await supabase
      .from('gift_exchange_members')
      .select('id, user_id, recipient_id')  // Correct field names
      .eq('gift_exchange_id', id)
      .eq('has_drawn', true)               // Only drawn members
      .not('recipient_id', 'is', null);    // Only members with recipients

    if (membersError || !members) {
      throw new Error('Failed to fetch members');
    }

    // console.log(`About to generate suggestions for ${members.length} members`);

    // Generate suggestions concurrently
    const suggestionPromises = members.map((member) => {
      return generateAndStoreSuggestions(
        supabase,
        id,
        member.user_id,
        member.recipient_id,
        exchange.budget,
      ).catch((error) => {
        console.error(`Failed to generate suggestions for ${member.user_id}:`, error);
        return null;
      })
    });
    
    // Wait for all suggestions to complete
    await Promise.allSettled(suggestionPromises);    

    const { data: suggestions } = await supabase
      .from('gift_suggestions')
      .select('*')
      .eq('gift_exchange_id', id)
      .eq('giver_id', user.id);

    // console.log('sending back to client...')
    // console.log(suggestions)

    const user_suggestions = suggestions?.map(x => x.suggestion);

    return NextResponse.json({ 
      success: true, 
      suggestions: user_suggestions || [] 
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}