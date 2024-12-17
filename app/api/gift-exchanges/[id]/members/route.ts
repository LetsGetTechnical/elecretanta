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
          email
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

// add a member to a gift exchange
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const exchangeId = searchParams.get("exchangeId");

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateGiftExchangeMemberRequest = await req.json();

    const { data, error } = await supabase
      .from("gift_exchange_members")
      .insert({
        gift_exchange_id: exchangeId,
        user_id: body.user_id,
        recipient_id: body.recipient_id || null,
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
    console.log(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
