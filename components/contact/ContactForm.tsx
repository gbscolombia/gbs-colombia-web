'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { Input, Textarea } from '@/components/ui';

export function ContactForm() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, company, email, message })
      });
      if (!res.ok) throw new Error('failed');
      setSent(true);
      setName('');
      setCompany('');
      setEmail('');
      setMessage('');
    } catch {
      setError(t('formError'));
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-2">
          {t('formSent')}
        </h3>
        <p className="text-[var(--text-secondary)]">{t('formSentDesc')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label={t('formName')}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={t('formCompany')}
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <Input
        label={t('formEmail')}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        label={t('formMessage')}
        required
        rows={5}
        placeholder={t('formMessagePlaceholder')}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && (
        <div className="rounded-lg bg-[var(--danger)]/10 text-[var(--danger)] text-sm px-4 py-3">{error}</div>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 h-12 w-full px-6 rounded-lg bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-deep)] text-white text-base font-semibold shadow-[var(--shadow-md)] disabled:opacity-50 disabled:pointer-events-none transition"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('formSubmit')}…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t('formSubmit')}
          </>
        )}
      </button>
    </form>
  );
}
