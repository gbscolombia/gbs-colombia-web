'use client';
import { useTranslations } from 'next-intl';
import { Boxes, Wrench } from 'lucide-react';
import type { DiagnosticPath } from '@/lib/diagnostic/diagnostic-data';

interface Props {
  value?: DiagnosticPath;
  onChange: (path: DiagnosticPath) => void;
}

export function Step0Decision({ value, onChange }: Props) {
  const t = useTranslations('diagnosticV2');

  const options: { key: DiagnosticPath; icon: typeof Boxes; title: string; desc: string }[] = [
    { key: 'supply', icon: Boxes, title: t('step0Supply'), desc: t('step0SupplyDesc') },
    { key: 'fabrication', icon: Wrench, title: t('step0Fabrication'), desc: t('step0FabricationDesc') }
  ];

  return (
    <div>
      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-2">
        {t('step0Title')}
      </h2>
      <p className="text-[var(--text-tertiary)] mb-8">{t('step0Subtitle')}</p>

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
                  selected
                    ? 'bg-[var(--brand-blue)] text-white'
                    : 'bg-[var(--neutral-100)] text-[var(--brand-navy)]'
                }`}
              >
                <Icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-1">
                {o.title}
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">{o.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
