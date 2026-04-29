'use client';
import { useTranslations } from 'next-intl';
import { Factory, Pickaxe } from 'lucide-react';
import type { OperationType } from '@/lib/diagnostic/diagnostic-data';

interface Props {
  value?: OperationType;
  onChange: (v: OperationType) => void;
}

export function Step1Operation({ value, onChange }: Props) {
  const t = useTranslations('diagnostic');

  const options: { key: OperationType; icon: typeof Factory; label: string; sub: string }[] = [
    { key: 'liviana', icon: Factory, label: t('step1Option1Label'), sub: t('step1Option1Sub') },
    { key: 'pesada', icon: Pickaxe, label: t('step1Option2Label'), sub: t('step1Option2Sub') }
  ];

  return (
    <div>
      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-8">
        {t('step1Title')}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((o) => {
          const Icon = o.icon;
          const selected = value === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              className={`text-left p-6 lg:p-8 rounded-2xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 shadow-[var(--shadow-md)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 hover:bg-[var(--neutral-50)]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  selected ? 'bg-[var(--brand-blue)] text-white' : 'bg-[var(--neutral-100)] text-[var(--brand-navy)]'
                }`}
              >
                <Icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-1">{o.label}</div>
              <div className="text-sm text-[var(--text-tertiary)]">{o.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
