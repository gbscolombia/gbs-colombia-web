'use client';
import { useTranslations } from 'next-intl';

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const t = useTranslations('diagnostic');
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
        <span>{t('progressStep', { current, total })}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--neutral-200)] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-cyan)] rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
