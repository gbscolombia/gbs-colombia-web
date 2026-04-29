'use client';
import { useTranslations } from 'next-intl';
import {
  LIGHT_BELT_TYPES,
  LIGHT_BELT_COLORS,
  LIGHT_BELT_FINISHES,
  LIGHT_BELT_PATTERNS,
  LIGHT_SPLICES,
  type SupplyLightDetail
} from '@/lib/diagnostic/diagnostic-data';
import { Input, Textarea } from '@/components/ui';

interface Props {
  value: SupplyLightDetail;
  onChange: (patch: Partial<SupplyLightDetail>) => void;
  freeText?: string;
  onFreeTextChange: (text: string) => void;
}

const beltLabels: Record<string, string> = {
  pu: 'Banda PU',
  pvc: 'Banda PVC',
  poliolefina: 'Poliolefina',
  siliconada: 'Siliconada',
  homogenea: 'Homogénea',
  malla: 'Malla',
  teflon: 'Teflón',
  modular: 'Modular',
  'carboxilato-nitrilo': 'Carboxilato Nitrilo',
  'transmision-potencia': 'Transmisión de potencia'
};

export function SupplyLightForm({ value, onChange, freeText, onFreeTextChange }: Props) {
  const t = useTranslations('diagnosticV2');

  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">
          {t('supplyLight')} — Tipo de banda
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LIGHT_BELT_TYPES.map((b) => {
            const sel = value.beltType === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => onChange({ beltType: sel ? undefined : b })}
                className={`text-left p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                  sel
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)] text-[var(--text-primary)]'
                }`}
              >
                {beltLabels[b]}
              </button>
            );
          })}
        </div>
      </div>

      {value.beltType && (
        <>
          <div>
            <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Características</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <Input
                label="Espesor (mm)"
                type="number"
                step="0.1"
                min={0.5}
                value={value.thicknessMm ?? ''}
                onChange={(e) => onChange({ thicknessMm: Number(e.target.value) || undefined })}
              />
              <div>
                <label className="text-sm font-medium text-[var(--text-secondary)] block mb-1.5">
                  Temperatura
                </label>
                <div className="flex gap-2">
                  {[
                    { v: false, lbl: '< 80°C' },
                    { v: true, lbl: '> 80°C' }
                  ].map((opt) => (
                    <button
                      key={String(opt.v)}
                      type="button"
                      onClick={() => onChange({ highTemp: opt.v })}
                      className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${
                        value.highTemp === opt.v
                          ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                          : 'border-[var(--border-subtle)]'
                      }`}
                    >
                      {opt.lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {LIGHT_BELT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange({ color: value.color === c ? undefined : c })}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold capitalize ${
                    value.color === c
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                      : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Acabado</h3>
            <div className="flex flex-wrap gap-2">
              {LIGHT_BELT_FINISHES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onChange({ finish: value.finish === f ? undefined : f })}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold capitalize ${
                    value.finish === f
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                      : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Patrón superficial</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {LIGHT_BELT_PATTERNS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onChange({ pattern: value.pattern === p ? undefined : p })}
                  className={`p-3 rounded-lg border-2 text-sm font-semibold capitalize ${
                    value.pattern === p
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                      : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {p.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Empalme</h3>
        <div className="flex flex-wrap gap-2">
          {LIGHT_SPLICES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ splice: value.splice === s ? undefined : s })}
              className={`px-4 py-2 rounded-full border-2 text-sm font-semibold capitalize ${
                value.splice === s
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                  : 'border-[var(--border-subtle)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Accesorios y notas"
        value={freeText ?? ''}
        onChange={(e) => onFreeTextChange(e.target.value)}
        placeholder="Empujadores, faldones, guías laterales, etc."
      />
    </div>
  );
}
