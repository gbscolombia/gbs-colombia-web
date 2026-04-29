'use client';
import { useTranslations } from 'next-intl';
import { BAND_WIDTHS, type Speed } from '@/lib/diagnostic/diagnostic-data';
import { Input } from '@/components/ui';

interface Props {
  widthMm?: number;
  widthOtherText?: string;
  lengthMeters?: number;
  speed?: Speed;
  onChange: (patch: { widthMm?: number; widthOtherText?: string; lengthMeters?: number; speed?: Speed }) => void;
}

export function Step4Dimensions({ widthMm, widthOtherText, lengthMeters, speed, onChange }: Props) {
  const t = useTranslations('diagnostic');

  const speeds: { key: Speed; label: string }[] = [
    { key: 'slow', label: t('step4SpeedSlow') },
    { key: 'medium', label: t('step4SpeedMedium') },
    { key: 'fast', label: t('step4SpeedFast') },
    { key: 'unknown', label: t('step4SpeedUnknown') }
  ];

  const isOther = widthMm === -1;

  return (
    <div>
      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-8">
        {t('step4Title')}
      </h2>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">
            {t('step4Width')}
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {BAND_WIDTHS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onChange({ widthMm: w, widthOtherText: undefined })}
                className={`py-3 rounded-lg border-2 font-semibold text-sm transition-all ${
                  widthMm === w
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 text-[var(--text-primary)]'
                }`}
              >
                {w}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onChange({ widthMm: -1 })}
              className={`py-3 rounded-lg border-2 font-semibold text-sm transition-all ${
                isOther
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 text-[var(--text-primary)]'
              }`}
            >
              {t('step4WidthOther')}
            </button>
          </div>
          {isOther && (
            <div className="mt-4">
              <Input
                placeholder="mm"
                value={widthOtherText || ''}
                onChange={(e) => onChange({ widthOtherText: e.target.value })}
              />
            </div>
          )}
        </div>

        <div>
          <Input
            label={t('step4Length')}
            type="number"
            min={1}
            placeholder={t('step4LengthPlaceholder')}
            value={lengthMeters || ''}
            onChange={(e) => onChange({ lengthMeters: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">
            {t('step4Speed')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {speeds.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => onChange({ speed: s.key })}
                className={`py-3 rounded-lg border-2 font-semibold text-sm transition-all ${
                  speed === s.key
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 text-[var(--text-primary)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
