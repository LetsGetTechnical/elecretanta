import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { CreateGiftExchangeMemberRequest } from "@/app/types/giftExchangeMember";

// get all members of a gift exchange
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

    const query = supabase
      .from("gift_exchange_members")
      .select(
        `
        id,
        gift_exchange_id,
        user_id,
        recipient_id,
        has_drawn,
        created_at,
        updated_at,
        member:profiles!user_id (
          id,
          display_name,
          email,
		  avatar
        ),
        recipient:profiles!recipient_id (
          id,
          display_name,
          email,
		  avatar
        )
      `
      )
      .eq("gift_exchange_id", id);

    const { data: membersData, error: membersError } = await query;

    if (membersError) {
      return NextResponse.json(
        { error: "Gift exchange members not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(membersData);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const giftExchangeId = await params.id;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get and validate request body
    const body: CreateGiftExchangeMemberRequest = await req.json();

    if (!body.user_id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if exchange exists and is valid
    const { data: exchange, error: exchangeError } = await supabase
      .from("gift_exchanges")
      .select("status")
      .eq("id", giftExchangeId)
      .single();

    if (exchangeError || !exchange) {
      return NextResponse.json(
        { error: "Gift exchange not found" },
        { status: 404 }
      );
    }

    // Insert new member
    const { data, error } = await supabase
      .from("gift_exchange_members")
      .insert({
        gift_exchange_id: giftExchangeId,
        user_id: body.user_id,
        recipient_id: null,
        has_drawn: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
