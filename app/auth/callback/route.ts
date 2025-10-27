import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { SupabaseError } from '@/lib/errors/CustomErrors';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirectPath =
    requestUrl.searchParams.get('redirect_to') || '/dashboard';

  try {
    if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Error with session:', error);
        return NextResponse.redirect(`${requestUrl.origin}/auth-code-error`);
      }

      return NextResponse.redirect(`${requestUrl.origin}${redirectPath}`);
    }
  } catch (error) {
    console.error('Error with session:', error);

    return NextResponse.redirect(`${requestUrl.origin}/auth-code-error`);
  }
}
