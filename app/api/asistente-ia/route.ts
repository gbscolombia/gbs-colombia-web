import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { aiChatSchema } from '@/lib/server/validation';
import { rateLimit, getClientIp, sweep } from '@/lib/server/rate-limit';
import { ASSISTANT_SYSTEM_PROMPT } from '@/lib/diagnostic/ai-prompt';

export const runtime = 'nodejs';

const RATE_LIMIT = Number(process.env.ASSISTANT_RATE_LIMIT_PER_HOUR ?? 20);
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';

export async function POST(request: Request) {
  sweep();
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `ai:${ip}`, limit: RATE_LIMIT, windowSec: 3600 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const parsed = aiChatSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_data' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'assistant_unavailable', message: 'ANTHROPIC_API_KEY not configured' },
      { status: 503 }
    );
  }

  const { question, history = [], locale } = parsed.data;
  const localeNote =
    locale === 'en'
      ? 'The user is writing in English; reply in English.'
      : 'The user is writing in Spanish; reply in Spanish.';

  const messages: Anthropic.MessageParam[] = [
    ...history.map<Anthropic.MessageParam>((m) => ({
      role: m.role,
      content: m.content
    })),
    { role: 'user', content: question }
  ];

  try {
    const client = new Anthropic({ apiKey });
    const completion = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      // Prompt caching on the system prompt — `cache_control` is recognized by the API at runtime
      // even when the published TS types don't (yet) expose it on TextBlockParam.
      system: [
        {
          type: 'text',
          text: ASSISTANT_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' }
        } as Anthropic.TextBlockParam,
        { type: 'text', text: localeNote }
      ],
      messages
    });
    const text = completion.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim();
    return NextResponse.json({ answer: text }, { status: 200 });
  } catch (err) {
    console.error('[asistente-ia] anthropic error', err);
    return NextResponse.json({ error: 'assistant_failed' }, { status: 502 });
  }
}
