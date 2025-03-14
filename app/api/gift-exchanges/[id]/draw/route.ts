import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { drawGiftExchange } from '@/lib/drawGiftExchange';

/**
 * API Route for drawing gift exchange names
 * POST /api/gift-exchanges/[id]/draw
 */

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const id = await params.id;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await drawGiftExchange(supabase, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    let status = 500; // default status
    if (message.includes('not found')) {
      status = 404;
    } else if (
      message.includes('already been drawn') ||
      message.includes('3 members')
    ) {
      status = 400;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
