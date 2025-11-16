import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { toSql } from 'pgvector/pg';
import { getPool } from '@/lib/db';
import { embedWithGemini, generateWithGemini, systemPrompt } from '@/lib/ai';

// Rate limiting (simple in-memory store)
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 20 * 60 * 1000; // 20 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimits.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (limit.count >= RATE_LIMIT) {
    return false;
  }

  limit.count++;
  return true;
}

// Initialize Supabase client
const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

// Session management
async function getOrCreateSession(userId: string, userAgent: string | null, ipAddress: string | null) {
  if (!supabase) return null;

  try {
    const { data: existingSessions } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('user_id', userId)
      .gte('session_started_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .is('session_ended_at', null)
      .order('session_started_at', { ascending: false })
      .limit(1);

    if (existingSessions && existingSessions.length > 0) {
      return existingSessions[0].id;
    }

    const { data: newSession } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: userId,
        user_agent: userAgent,
        ip_address: ipAddress
      })
      .select('id')
      .single();

    return newSession?.id || null;
  } catch (error) {
    console.error('Session management error:', error);
    return null;
  }
}

async function saveChatMessage(
  sessionId: string,
  messageType: 'user' | 'ai',
  content: string,
  metadata: Record<string, any> = {}
) {
  if (!supabase || !sessionId) return false;

  try {
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      message_type: messageType,
      content: content,
      metadata: metadata
    });
    return true;
  } catch (error) {
    console.error('Chat message save error:', error);
    return false;
  }
}

async function getRecentChatHistory(sessionId: string, limit = 10) {
  if (!supabase || !sessionId) return [];

  try {
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('message_type, content, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(limit);

    return messages ? messages.reverse() : [];
  } catch (error) {
    console.error('Chat history retrieval error:', error);
    return [];
  }
}

function createContextualQuery(currentQuestion: string, chatHistory: any[]) {
  if (!chatHistory || chatHistory.length === 0) {
    return currentQuestion;
  }

  const recentUserMessages = chatHistory
    .filter((msg) => msg.message_type === 'user')
    .slice(-3)
    .map((msg) => msg.content);

  return [...recentUserMessages, currentQuestion].join(' ');
}

function buildPrompt(question: string, matches: any[], chatHistory: any[] = []) {
  const context = matches.map((m, i) => `[${i + 1}] ${m.text}`).join('\n\n---\n\n');

  let conversationHistory = '';
  if (chatHistory && chatHistory.length > 0) {
    const recentMessages = chatHistory.slice(-8);
    conversationHistory = recentMessages
      .map((msg) => `${msg.message_type.toUpperCase()}: ${msg.content}`)
      .join('\n');
  }

  return `${systemPrompt}

${conversationHistory ? `Previous Conversation:\n${conversationHistory}\n\n` : ''}Retrieved Context:
${context}

Current User Question: ${question}

Please answer the current question using the retrieved context above. If there's relevant conversation history, reference it naturally to maintain continuity. If the context doesn't contain the information needed, use your general knowledge about Erin but mention that you're working with limited context.

IMPORTANT: Do not include numbered references like [1], [2], etc. in your response. Write naturally without citing specific source numbers.`;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  
  // Rate limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const { message, k } = await req.json();
    const topK = Number.isInteger(k) && k > 0 && k <= 20 ? k : 8;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent');
    const sessionId = await getOrCreateSession(ip, userAgent, ip);
    const chatHistory = await getRecentChatHistory(sessionId || '');

    if (sessionId) {
      await saveChatMessage(sessionId, 'user', message.trim());
    }

    const pool = getPool();
    if (!pool || !process.env.GEMINI_API_KEY) {
      const fallbackResponse = "I don't know. You can contact Erin at lunarspired@gmail.com.";
      if (sessionId) {
        await saveChatMessage(sessionId, 'ai', fallbackResponse, {
          source: 'fallback',
          response_time_ms: Date.now() - startTime
        });
      }
      return NextResponse.json({ response: fallbackResponse, source: 'fallback' });
    }

    const contextualQuery = createContextualQuery(message.trim(), chatHistory);
    const qvec = await embedWithGemini(contextualQuery);

    const { rows: matches } = await pool.query(
      `select id, doc_id, "order",
              left(text, 1500) as text,
              headings, source_path, score
       from match_chunks($1::vector(768), $2::text, $3::int)`,
      [toSql(qvec), contextualQuery, topK]
    );

    if (!matches || matches.length === 0) {
      const noMatchResponse = "I don't know. You can contact Erin at lunarspired@gmail.com.";
      if (sessionId) {
        await saveChatMessage(sessionId, 'ai', noMatchResponse, {
          source: 'no_matches',
          response_time_ms: Date.now() - startTime,
          chunks_found: 0
        });
      }
      return NextResponse.json({
        response: noMatchResponse,
        source: 'no_matches',
        chunks: []
      });
    }

    const prompt = buildPrompt(message, matches, chatHistory);
    const answer = await generateWithGemini(prompt);
    const finalResponse = answer || "I don't know. You can contact Erin at lunarspired@gmail.com.";

    if (sessionId) {
      await saveChatMessage(sessionId, 'ai', finalResponse, {
        source: 'rag',
        response_time_ms: Date.now() - startTime,
        chunks_found: matches.length,
        top_chunk_score: matches[0]?.score || 0,
        has_conversation_context: chatHistory.length > 0
      });
    }

    return NextResponse.json({
      response: finalResponse,
      source: 'rag',
      chunks: matches
    });
  } catch (err: any) {
    console.error('RAG API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

