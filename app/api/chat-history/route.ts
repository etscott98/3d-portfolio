import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

export async function GET(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Chat history not configured' }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const sessionId = searchParams.get('session_id');

    let query = supabase
      .from('chat_messages')
      .select(`
        *,
        chat_sessions(user_id, session_started_at, ip_address)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({ messages: data || [] });
  } catch (error: any) {
    console.error('Chat history error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

