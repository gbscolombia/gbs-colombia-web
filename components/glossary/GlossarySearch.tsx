'use client';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { GlossaryTerm } from '@/lib/content/glossary';

export function GlossarySearch({ terms }: { terms: GlossaryTerm[] }) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter((term) => {
      const t1 = locale === 'en' ? term.termEn : term.termEs;
      const d1 = locale === 'en' ? term.definitionEn : term.definitionEs;
      return t1.toLowerCase().includes(q) || d1.toLowerCase().includes(q);
    });
  }, [query, terms, locale]);

  return (
    <>
      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)] pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[var(--border-subtle)] focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[var(--brand-blue)]/15 outline-none transition text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--text-tertiary)]">{t('noResults')}</p>
      ) : (
        <dl className="grid md:grid-cols-2 gap-4">
          {filtered.map((term) => (
            <div
              key={term.slug}
              id={term.slug}
              className="bg-white rounded-xl p-5 border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 transition"
            >
              <dt className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
                {locale === 'en' ? term.termEn : term.termEs}
              </dt>
              <dd className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {locale === 'en' ? term.definitionEn : term.definitionEs}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}
