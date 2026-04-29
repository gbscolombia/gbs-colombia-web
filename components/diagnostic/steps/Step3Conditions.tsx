'use client';
import { useTranslations } from 'next-intl';
import { Thermometer, Droplets, Leaf, Zap, GitFork, TrendingUp, ArrowDown, FlaskConical, Check } from 'lucide-react';
import { CONDITIONS, type ConditionKey } from '@/lib/diagnostic/diagnostic-data';

interface Props {
  value: ConditionKey[];
  onChange: (conditions: ConditionKey[]) => void;
}

const ICONS: Record<ConditionKey, typeof Thermometer> = {
  temperatura: Thermometer,
  humedad: Droplets,
  fda: Leaf,
  abrasion: Zap,
  curvas: GitFork,
  pendiente: TrendingUp,
  impacto: ArrowDown,
  quimicos: FlaskConical
};

const LABELS: Record<ConditionKey, string> = {
  temperatura: 'step3Cond1',
  humedad: 'step3Cond2',
  fda: 'step3Cond3',
  abrasion: 'step3Cond4',
  curvas: 'step3Cond5',
  pendiente: 'step3Cond6',
  impacto: 'step3Cond7',
  quimicos: 'step3Cond8'
};

export function Step3Conditions({ value, onChange }: Props) {
  const t = useTranslations('diagnostic');

  const toggle = (key: ConditionKey) => {
    if (value.includes(key)) onChange(value.filter((v) => v !== key));
    else onChange([...value, key]);
  };

  return (
    <div>
      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid">
        {t('step3Title')}
      </h2>
      <p className="mt-2 text-[var(--text-tertiary)]">{t('step3Subtitle')}</p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {CONDITIONS.map((c) => {
          const Icon = ICONS[c];
          const selected = value.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5'
                  : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40'
              }`}
            >
              {selected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--brand-blue)] text-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
              )}
              <Icon
                className={`w-6 h-6 mb-3 ${selected ? 'text-[var(--brand-blue)]' : 'text-[var(--text-tertiary)]'}`}
                strokeWidth={1.75}
              />
              <div className="font-semibold text-[var(--brand-navy)] text-sm leading-tight">
                {t(LABELS[c])}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
