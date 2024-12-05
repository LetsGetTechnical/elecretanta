import { createClient } from "@/lib/utils/supabase/server";
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();
  
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single();
  
      if (error) throw error;
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }