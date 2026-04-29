'use client';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  BAND_WIDTHS,
  MATERIALS,
  type FabricationData,
  type Speed,
  type StructureMaterial,
  type ConveyorType
} from '@/lib/diagnostic/diagnostic-data';
import { Input, Textarea } from '@/components/ui';
import { calcSummary, fmt } from '@/lib/diagnostic/formulas-cema';

interface Props {
  value: Partial<FabricationData>;
  onChange: (patch: Partial<FabricationData>) => void;
}

const conveyorOptions: { v: ConveyorType; lbl: string }[] = [
  { v: 'horizontal', lbl: 'Horizontal' },
  { v: 'inclinado', lbl: 'Inclinado' },
  { v: 'inclinado-z', lbl: 'Z' },
  { v: 'elevador-vertical', lbl: 'Elevador vertical' }
];

const structureOptions: { v: StructureMaterial; lbl: string }[] = [
  { v: 'acero-inoxidable', lbl: 'Acero inoxidable' },
  { v: 'acero-carbon', lbl: 'Acero al carbón' }
];

const speedOptions: { v: Speed; lbl: string }[] = [
  { v: 'slow', lbl: 'Lenta (<1 m/s)' },
  { v: 'medium', lbl: 'Media (1–3 m/s)' },
  { v: 'fast', lbl: 'Rápida (>3 m/s)' },
  { v: 'unknown', lbl: 'No sé' }
];

export function FabricationForm({ value, onChange }: Props) {
  const t = useTranslations('diagnosticV2');
  const tDiag = useTranslations('diagnostic');

  const liftM = useMemo(() => {
    if (
      value.hasInclination &&
      value.inclinationStartH != null &&
      value.inclinationEndH != null
    ) {
      return value.inclinationEndH - value.inclinationStartH;
    }
    return 0;
  }, [value.hasInclination, value.inclinationStartH, value.inclinationEndH]);

  const cema = useMemo(() => {
    if (!value.widthMm || value.widthMm <= 0 || !value.lengthM || value.lengthM <= 0) return null;
    if (!value.speed || value.speed === 'unknown') return null;
    return calcSummary({
      widthMm: value.widthMm,
      lengthM: value.lengthM,
      liftM,
      speed: value.speed,
      materialSlug: value.materialSlug
    });
  }, [value.widthMm, value.lengthM, value.speed, value.materialSlug, liftM]);

  const isWidthCustom = value.widthMm === -1;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid">
          {t('fabricationTitle')}
        </h2>
      </div>

      {/* Línea + material */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
            Línea
          </label>
          <div className="flex gap-2">
            {(['liviana', 'pesada'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => onChange({ line: l })}
                className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold capitalize ${
                  value.line === l
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
            Material a transportar
          </label>
          <select
            value={value.materialSlug ?? ''}
            onChange={(e) => onChange({ materialSlug: e.target.value })}
            className="w-full rounded-lg border-2 border-[var(--border-subtle)] bg-white px-4 py-3 text-base focus:border-[var(--brand-blue)] focus:outline-none"
          >
            <option value="">— elige —</option>
            {MATERIALS.filter((m) => !value.line || m.operation === value.line).map((m) => (
              <option key={m.slug} value={m.slug}>
                {tDiag(`materials.${m.slug}` as never)}
              </option>
            ))}
            <option value="otro">Otro material</option>
          </select>
          {value.materialSlug === 'otro' && (
            <Input
              className="mt-2"
              placeholder="Especifica"
              value={value.materialOtherText ?? ''}
              onChange={(e) => onChange({ materialOtherText: e.target.value })}
            />
          )}
        </div>
      </div>

      {/* Condiciones */}
      <div className="grid sm:grid-cols-3 gap-3">
        <BoolPill
          label="Temperatura > 80°C"
          checked={!!value.highTemp}
          onChange={(v) => onChange({ highTemp: v })}
        />
        <BoolPill
          label="Humedad / lavado frecuente"
          checked={!!value.highHumidity}
          onChange={(v) => onChange({ highHumidity: v })}
        />
        <BoolPill
          label="Requiere filtración"
          checked={!!value.needsFiltration}
          onChange={(v) => onChange({ needsFiltration: v })}
        />
      </div>

      {/* Estructura */}
      <div>
        <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
          {t('fabricationStructure')}
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {structureOptions.map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => onChange({ structure: opt.v })}
              className={`p-3 rounded-lg border-2 text-sm font-semibold ${
                value.structure === opt.v
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                  : 'border-[var(--border-subtle)]'
              }`}
            >
              {opt.lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensiones */}
      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">
          {t('fabricationDimensions')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
              {t('fabricationWidthLabel')}
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {BAND_WIDTHS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => onChange({ widthMm: w, widthOtherText: undefined })}
                  className={`py-3 rounded-lg border-2 font-semibold text-sm ${
                    value.widthMm === w
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                      : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {w}
                </button>
              ))}
              <button
                type="button"
                onClick={() => onChange({ widthMm: -1 })}
                className={`py-3 rounded-lg border-2 font-semibold text-sm ${
                  isWidthCustom
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                Otro
              </button>
            </div>
            {isWidthCustom && (
              <Input
                className="mt-3"
                placeholder="mm"
                value={value.widthOtherText ?? ''}
                onChange={(e) => onChange({ widthOtherText: e.target.value })}
              />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              label={t('fabricationLengthLabel')}
              type="number"
              min={0.5}
              step="0.1"
              value={value.lengthM ?? ''}
              onChange={(e) => onChange({ lengthM: Number(e.target.value) || undefined })}
            />
            <Input
              label={t('fabricationHeightLabel')}
              type="number"
              min={0}
              step="0.1"
              value={value.heightM ?? ''}
              onChange={(e) => onChange({ heightM: Number(e.target.value) || undefined })}
            />
          </div>
        </div>
      </div>

      {/* Inclinación */}
      <div>
        <BoolPill
          label={t('fabricationInclination')}
          checked={!!value.hasInclination}
          onChange={(v) => onChange({ hasInclination: v })}
        />
        {value.hasInclination && (
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <Input
              label={t('fabricationInclinationStartH')}
              type="number"
              step="0.1"
              value={value.inclinationStartH ?? ''}
              onChange={(e) => onChange({ inclinationStartH: Number(e.target.value) })}
            />
            <Input
              label={t('fabricationInclinationEndH')}
              type="number"
              step="0.1"
              value={value.inclinationEndH ?? ''}
              onChange={(e) => onChange({ inclinationEndH: Number(e.target.value) })}
            />
            <Input
              label={t('fabricationInclinationLength')}
              type="number"
              step="0.1"
              value={value.inclinationLengthM ?? ''}
              onChange={(e) => onChange({ inclinationLengthM: Number(e.target.value) })}
            />
            <div className="sm:col-span-3">
              <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
                {t('fabricationConveyorType')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {conveyorOptions.map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => onChange({ conveyorType: opt.v })}
                    className={`p-3 rounded-lg border-2 text-sm font-semibold ${
                      value.conveyorType === opt.v
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
        )}
      </div>

      {/* TPH + velocidad */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Input
          label={t('fabricationTph')}
          type="number"
          min={0}
          value={value.tph ?? ''}
          onChange={(e) => onChange({ tph: Number(e.target.value) || undefined })}
          hint="Si la conoces. Si no, la calculamos."
        />
        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
            Velocidad
          </label>
          <div className="grid grid-cols-2 gap-2">
            {speedOptions.map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => onChange({ speed: opt.v })}
                className={`py-3 rounded-lg border-2 text-sm font-semibold ${
                  value.speed === opt.v
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

      {/* Voltaje + automatización */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
            {t('fabricationVoltage')}
          </label>
          <div className="flex gap-2">
            {[110, 220, 440].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ voltage: v as 110 | 220 | 440 })}
                className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${
                  value.voltage === v
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                {v}V
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">
            {t('fabricationAutomation')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['ninguna', 'basica', 'avanzada'] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => onChange({ automation: a })}
                className={`py-3 rounded-lg border-2 text-sm font-semibold capitalize ${
                  value.automation === a
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Textarea
        label={t('fabricationAccessories')}
        value={value.accessoriesText ?? ''}
        onChange={(e) => onChange({ accessoriesText: e.target.value })}
      />
      <Input
        label={t('fabricationGranulometry')}
        value={value.granulometry ?? ''}
        onChange={(e) => onChange({ granulometry: e.target.value })}
        hint="Tamaño aproximado del material (ej: 0–25 mm)"
      />

      {/* CEMA preview */}
      {cema && (
        <div className="rounded-2xl border-2 border-[var(--brand-blue)]/30 bg-gradient-to-br from-[var(--brand-blue)]/5 to-[var(--brand-cyan)]/5 p-6">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--brand-blue)] mb-3">
            {t('calcSectionTitle')}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <CalcCell label={t('calcTph')} value={fmt(cema.tph, 'TPH')} />
            <CalcCell label={t('calcPower')} value={fmt(cema.powerKw, 'kW', 2)} />
            <CalcCell label={t('calcTorque')} value={fmt(cema.torqueNm, 'Nm', 0)} />
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-4">{t('calcDisclaimer')}</p>
        </div>
      )}
    </div>
  );
}

function BoolPill({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[var(--text-secondary)] block mb-2">{label}</label>
      <div className="flex gap-2">
        {[
          { v: true, lbl: 'Sí' },
          { v: false, lbl: 'No' }
        ].map((o) => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => onChange(o.v)}
            className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${
              checked === o.v
                ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                : 'border-[var(--border-subtle)]'
            }`}
          >
            {o.lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

function CalcCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">{label}</div>
      <div className="font-heading font-bold text-2xl text-[var(--brand-navy)]">{value}</div>
    </div>
  );
}
