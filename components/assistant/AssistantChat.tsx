'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Send, Loader2, Sparkles, MessageCircle, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button, Card } from '@/components/ui';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';
import { analytics } from '@/components/analytics/events';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_LEN = 500;

export function AssistantChat() {
  const t = useTranslations('assistant');
  const tWa = useTranslations('whatsappFloat');
  const locale = useLocale();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, loading]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    setError(null);
    setInput('');
    const next: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setLoading(true);
    analytics.assistantMessage(next.filter((m) => m.role === 'user').length);
    try {
      const res = await fetch('/api/asistente-ia', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question: q,
          history: messages.slice(-12),
          locale: locale === 'en' ? 'en' : 'es'
        })
      });
      if (res.status === 429) {
        setError(t('rateLimit'));
        return;
      }
      if (!res.ok) {
        setError(t('error'));
        return;
      }
      const data = (await res.json()) as { answer?: string };
      setMessages([...next, { role: 'assistant', content: data.answer ?? '' }]);
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card tone="white" padding="none" className="max-w-3xl mx-auto overflow-hidden">
      <div className="px-6 py-5 border-b border-[var(--border-subtle)] bg-gradient-to-r from-[var(--brand-navy)] to-[var(--brand-blue-deep)] text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-bold text-lg">{t('title')}</div>
            <div className="text-xs text-white/70">{t('scopeNotice')}</div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="px-6 py-6 max-h-[55vh] overflow-y-auto space-y-4 bg-[var(--neutral-50)]">
        {messages.length === 0 && (
          <div className="rounded-xl bg-white border border-[var(--border-subtle)] p-4 text-sm text-[var(--text-secondary)]">
            {t('welcome')}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[var(--brand-blue)] text-white rounded-br-sm'
                  : 'bg-white border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-bl-sm'
              }`}
            >
              {m.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-[var(--brand-navy)] prose-strong:text-[var(--brand-navy)]">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('thinking')}
          </div>
        )}
        {error && (
          <div className="rounded-lg bg-[var(--danger)]/10 text-[var(--danger)] text-sm px-4 py-3">
            {error}
          </div>
        )}
      </div>

      <form
        className="px-4 py-4 border-t border-[var(--border-subtle)] flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <textarea
          value={input}
          maxLength={MAX_LEN}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={2}
          placeholder={t('placeholder')}
          className="flex-1 resize-none rounded-lg border border-[var(--border-default)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/30 focus:border-[var(--brand-blue)]"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-deep)] disabled:opacity-50 disabled:pointer-events-none"
          aria-label={t('send')}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>

      <div className="px-6 pb-5 flex flex-wrap gap-3">
        <Button
          href="/diagnostico"
          variant="secondary"
          size="md"
          icon={<Activity className="w-4 h-4" />}
          iconPosition="left"
        >
          {t('goDiagnostic')}
        </Button>
        <a
          href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--brand-blue)] font-semibold text-sm hover:bg-[var(--brand-blue)]/5"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </Card>
  );
}
