'use client';
import { useTranslations } from 'next-intl';
import {
  HEAVY_BELT_TYPES,
  ROLLER_MATERIALS,
  ROLLER_TYPES,
  CLEANER_TYPES,
  MECH_SPLICES,
  type SupplyHeavyDetail,
  type RollerType,
  type CleanerType
} from '@/lib/diagnostic/diagnostic-data';
import { Input, Textarea } from '@/components/ui';

interface Props {
  value: SupplyHeavyDetail;
  onChange: (patch: Partial<SupplyHeavyDetail>) => void;
  freeText?: string;
  onFreeTextChange: (text: string) => void;
}

const labels: Record<string, string> = {
  'abrasion-din-y-z': 'Abrasión (DIN Y, Z)',
  'alta-temperatura': 'Alta temperatura (T2/T3)',
  'grasas-aceites': 'Grasas y aceites',
  'alma-acero-st': 'Alma de acero (ST)',
  'elevadora-pelicula': 'Elevadora con película',
  'elevadora-sin-pelicula': 'Elevadora sin película',
  corrugada: 'Corrugada',
  'nervada-chevron': 'Nervada Chevron',
  'nervada-multi-v': 'Nervada Multi-V',
  'nervada-espina-pescado': 'Espina de Pescado',
  antiflama: 'Antiflama',
  'cortes-impactos': 'Cortes e impactos',
  quimicos: 'Químicos'
};

const rollerLabels: Record<RollerType, string> = {
  carga: 'Carga',
  retorno: 'Retorno',
  impacto: 'Impacto',
  'cama-impacto': 'Cama de impacto',
  'artesa-20': 'Artesa 20°',
  'artesa-35': 'Artesa 35°',
  'artesa-retorno': 'Artesa retorno',
  'artesa-auto-alineante': 'Auto-alineante',
  'estacion-auto-alineante': 'Estación auto-alineante',
  'anti-colmante': 'Anti-colmante',
  especiales: 'Especiales'
};

const cleanerLabels: Record<CleanerType, string> = {
  primario: 'Primario',
  secundario: 'Secundario',
  dual: 'Dual',
  vpillow: 'V-pillow'
};

export function SupplyHeavyForm({ value, onChange, freeText, onFreeTextChange }: Props) {
  const t = useTranslations('diagnosticV2');
  const toggleRoller = (k: RollerType) => {
    const cur = value.rollerTypes ?? [];
    onChange({ rollerTypes: cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k] });
  };
  const toggleCleaner = (k: CleanerType) => {
    const cur = value.cleanerTypes ?? [];
    onChange({ cleanerTypes: cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k] });
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">
          {t('supplyHeavy')} — Bandas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {HEAVY_BELT_TYPES.map((b) => {
            const sel = value.beltType === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => onChange({ beltType: sel ? undefined : b })}
                className={`text-left p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                  sel
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40 text-[var(--text-primary)]'
                }`}
              >
                {labels[b]}
              </button>
            );
          })}
        </div>
        {value.beltType && (
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <Input
              label="Lonas"
              type="number"
              min={1}
              value={value.plies ?? ''}
              onChange={(e) => onChange({ plies: Number(e.target.value) || undefined })}
            />
            <Input
              label="Ancho (mm)"
              type="number"
              min={100}
              value={value.widthMm ?? ''}
              onChange={(e) => onChange({ widthMm: Number(e.target.value) || undefined })}
            />
            <Input
              label="Largo (m)"
              type="number"
              min={1}
              value={value.lengthM ?? ''}
              onChange={(e) => onChange({ lengthM: Number(e.target.value) || undefined })}
            />
          </div>
        )}
      </div>

      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Rodillos</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {ROLLER_MATERIALS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChange({ rollerMaterial: value.rollerMaterial === m ? undefined : m })}
              className={`px-4 py-2 rounded-full border-2 text-sm font-semibold capitalize ${
                value.rollerMaterial === m
                  ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                  : 'border-[var(--border-subtle)]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ROLLER_TYPES.map((rt) => {
            const sel = value.rollerTypes?.includes(rt);
            return (
              <button
                key={rt}
                type="button"
                onClick={() => toggleRoller(rt)}
                className={`text-left p-3 rounded-lg border-2 text-sm transition-all ${
                  sel
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)] text-[var(--text-primary)]'
                }`}
              >
                {rollerLabels[rt]}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Limpiadores</h3>
        <div className="flex flex-wrap gap-2">
          {CLEANER_TYPES.map((c) => {
            const sel = value.cleanerTypes?.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCleaner(c)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-semibold ${
                  sel
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                    : 'border-[var(--border-subtle)] text-[var(--text-primary)]'
                }`}
              >
                {cleanerLabels[c]}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Empalme</h3>
        <div className="flex flex-wrap gap-2">
          {MECH_SPLICES.map((s) => (
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
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-3">Motor / Variador</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <Input
            label="Potencia motor (kW)"
            type="number"
            min={0}
            step="0.1"
            value={value.motorPowerKw ?? ''}
            onChange={(e) => onChange({ motorPowerKw: Number(e.target.value) || undefined })}
          />
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)] block mb-1.5">
              Voltaje
            </label>
            <div className="flex gap-2">
              {[110, 220, 440].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    onChange({
                      motorVoltage:
                        value.motorVoltage === v ? undefined : (v as 110 | 220 | 440)
                    })
                  }
                  className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold ${
                    value.motorVoltage === v
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]'
                      : 'border-[var(--border-subtle)]'
                  }`}
                >
                  {v}V
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Variador (kW)"
            type="number"
            min={0}
            step="0.1"
            value={value.variatorPowerKw ?? ''}
            onChange={(e) => onChange({ variatorPowerKw: Number(e.target.value) || undefined })}
          />
        </div>
      </div>

      <Textarea
        label="Notas adicionales"
        value={freeText ?? ''}
        onChange={(e) => onFreeTextChange(e.target.value)}
        placeholder="Cualquier dato adicional que ayude a tu cotización"
      />
    </div>
  );
}
