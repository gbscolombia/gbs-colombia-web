'use client';
import { useTranslations } from 'next-intl';
import { MATERIALS, type OperationType } from '@/lib/diagnostic/diagnostic-data';
import { Input } from '@/components/ui';

interface Props {
  operation?: OperationType;
  value?: string;
  otherText?: string;
  onChange: (material: string, otherText?: string) => void;
}

export function Step2Material({ operation, value, otherText, onChange }: Props) {
  const t = useTranslations('diagnostic');
  const available = MATERIALS.filter((m) => !operation || m.operation === operation);

  return (
    <div>
      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-8">
        {t('step2Title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {available.map((m) => {
          const selected = value === m.slug;
          return (
            <button
              key={m.slug}
              type="button"
              onClick={() => onChange(m.slug)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5'
                  : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 hover:bg-[var(--neutral-50)]'
              }`}
            >
              <div className="font-semibold text-[var(--brand-navy)] text-sm">
                {t(`materials.${m.slug}`)}
              </div>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onChange('otro')}
          className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
            value === 'otro'
              ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5'
              : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 hover:bg-[var(--neutral-50)]'
          }`}
        >
          <div className="font-semibold text-[var(--brand-navy)] text-sm">{t('step2MaterialOther')}</div>
        </button>
      </div>
      {value === 'otro' && (
        <div className="mt-5">
          <Input
            label={t('step2MaterialOtherPlaceholder')}
            value={otherText || ''}
            onChange={(e) => onChange('otro', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
