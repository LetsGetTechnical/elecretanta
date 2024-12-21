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

    // Get gift suggestions for this user in this exchange
    const { data: suggestions, error } = await supabase
      .from("gift_suggestions")
      .select("*")
      .eq("gift_exchange_id", id)
      .eq("giver_id", user.id);

    if (error) {
      console.error("supabase error", error);
      return NextResponse.json(
        { error: "Failed to fetch gift suggestions" },
        { status: 500 }
      );
    }

    const formattedSuggestions = suggestions.map((s) => ({
      ...s.suggestion,
      id: s.id,
      created_at: s.created_at,
    }));

    return NextResponse.json(formattedSuggestions);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
