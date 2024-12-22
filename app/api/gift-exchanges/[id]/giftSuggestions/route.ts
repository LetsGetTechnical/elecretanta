import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = await params.id;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get match with full profile info
    const { data: match, error: matchError } = await supabase
      .from("gift_exchange_members")
      .select(
        `
          id,
          recipient_id,
          recipient:profiles!gift_exchange_members_recipient_id_fkey (
            id,
            display_name,
            age_group,
            categories,
            hobbies,
            avoid,
            practical_whimsical,
            cozy_adventurous,
            minimal_luxurious,
            email
          )
        `
      )
      .eq("gift_exchange_id", id)
      .eq("user_id", user.id)
      .single();

    if (matchError) {
      return NextResponse.json(
        { error: "Failed to fetch match" },
        { status: 500 }
      );
    }

    // Get suggestions
    const { data: suggestions, error: suggestionsError } = await supabase
      .from("gift_suggestions")
      .select("*")
      .eq("gift_exchange_id", id)
      .eq("giver_id", user.id);

    if (suggestionsError) {
      return NextResponse.json(
        { error: "Failed to fetch suggestions" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      match: match.recipient,
      suggestions: suggestions.map((s) => ({
        ...s.suggestion,
        id: s.id,
        created_at: s.created_at,
      })),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
