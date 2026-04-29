'use client';
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Step0Decision } from './steps/Step0Decision';
import { SupplyHeavyForm } from './steps/SupplyHeavyForm';
import { SupplyLightForm } from './steps/SupplyLightForm';
import { FabricationForm } from './steps/FabricationForm';
import { Step5Contact } from './steps/Step5Contact';
import { BriefViewV2 } from './BriefViewV2';
import { Button, Card } from '@/components/ui';
import type {
  ContactData,
  DiagnosticBriefV2,
  DiagnosticFormDataV2,
  DiagnosticPath,
  FabricationData,
  OperationType,
  SupplyData,
  SupplyHeavyDetail,
  SupplyLightDetail
} from '@/lib/diagnostic/diagnostic-data';
import { analytics } from '@/components/analytics/events';

type StepKey = 'path' | 'supply-line' | 'supply-heavy' | 'supply-light' | 'fabrication' | 'contact';

export function DiagnosticoWizardV2() {
  const t = useTranslations('diagnostic');
  const tV2 = useTranslations('diagnosticV2');
  const tc = useTranslations('common');
  const locale = useLocale();

  const [step, setStep] = useState<StepKey>('path');
  const [path, setPath] = useState<DiagnosticPath>();
  const [supply, setSupply] = useState<SupplyData>();
  const [fabrication, setFabrication] = useState<Partial<FabricationData>>({
    line: 'pesada',
    automation: 'ninguna',
    voltage: 220,
    speed: 'medium',
    structure: 'acero-carbon',
    hasInclination: false,
    highTemp: false,
    highHumidity: false,
    needsFiltration: false
  });
  const [contact, setContact] = useState<Partial<ContactData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [brief, setBrief] = useState<DiagnosticBriefV2 | null>(null);

  useEffect(() => {
    analytics.diagnosticStarted();
  }, []);

  const stepOrder = useMemo<StepKey[]>(() => {
    if (!path) return ['path'];
    if (path === 'supply') {
      const line = supply?.line;
      if (!line) return ['path', 'supply-line'];
      return ['path', 'supply-line', line === 'pesada' ? 'supply-heavy' : 'supply-light', 'contact'];
    }
    return ['path', 'fabrication', 'contact'];
  }, [path, supply?.line]);

  const currentIdx = Math.max(0, stepOrder.indexOf(step));
  const total = stepOrder.length;

  const validate = (s: StepKey): boolean => {
    const e: Record<string, string> = {};
    if (s === 'path' && !path) e.path = '!';
    if (s === 'supply-line' && !supply?.line) e.line = '!';
    if (s === 'fabrication') {
      if (!fabrication.line) e.line = 'Selecciona la línea (pesada / liviana)';
      if (!fabrication.materialSlug) e.material = t('errors.materialRequired');
      if (fabrication.materialSlug === 'otro' && !fabrication.materialOtherText)
        e.material = 'Especifica el material';
      if (!fabrication.widthMm) e.width = t('errors.widthRequired');
      else if (fabrication.widthMm === -1 && !fabrication.widthOtherText)
        e.width = 'Escribe el ancho de banda';
      if (!fabrication.lengthM || fabrication.lengthM <= 0) e.length = t('errors.lengthRequired');
      if (!fabrication.structure) e.structure = 'Selecciona el material de estructura';
      if (!fabrication.speed) e.speed = 'Selecciona la velocidad';
    }
    if (s === 'contact') {
      if (!contact.name) e.name = t('errors.nameRequired');
      if (!contact.company) e.company = t('errors.companyRequired');
      if (!contact.whatsapp) e.whatsapp = t('errors.whatsappRequired');
      else if (!/^[+]?[\d\s-]{7,20}$/.test(contact.whatsapp)) e.whatsapp = t('errors.whatsappInvalid');
      if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = t('errors.emailInvalid');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validate(step)) {
      // scroll to top so the user sees the error banner
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrors({});
    analytics.diagnosticStepCompleted(currentIdx + 1, step);
    const next = stepOrder[currentIdx + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    setErrors({});
    const prev = stepOrder[currentIdx - 1];
    if (prev) setStep(prev);
  };

  const submit = async () => {
    if (!validate('contact')) return;
    if (!path) return;
    setSubmitting(true);
    try {
      const data: DiagnosticFormDataV2 = {
        path,
        supply: path === 'supply' ? supply : undefined,
        fabrication: path === 'fabrication' ? (fabrication as FabricationData) : undefined,
        contact: contact as ContactData,
        locale: locale === 'en' ? 'en' : 'es'
      };
      const res = await fetch('/api/diagnostico/submit-v2', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('submit failed');
      const body = (await res.json()) as { brief: DiagnosticBriefV2 };
      setBrief(body.brief);
      analytics.diagnosticCompleted(body.brief.code, {
        path,
        operation:
          path === 'fabrication'
            ? body.brief.data.fabrication?.line
            : body.brief.data.supply?.line,
        material:
          body.brief.data.fabrication?.materialSlug ??
          body.brief.data.supply?.heavy?.beltType ??
          body.brief.data.supply?.light?.beltType
      });
    } catch {
      setErrors({ submit: 'submit failed' });
    } finally {
      setSubmitting(false);
    }
  };

  if (brief) return <BriefViewV2 brief={brief} />;

  const onSupplyLine = (line: OperationType) => {
    setSupply({ line, heavy: line === 'pesada' ? {} : undefined, light: line === 'liviana' ? {} : undefined });
  };

  const errorList = Object.values(errors).filter(Boolean);

  return (
    <Card tone="white" padding="lg" className="max-w-3xl mx-auto">
      <ProgressBar current={currentIdx + 1} total={total} />

      {errorList.length > 0 && (
        <div className="mb-6 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/30 px-4 py-3 text-sm text-[var(--danger)]">
          <strong className="block mb-1">Faltan datos para continuar:</strong>
          <ul className="list-disc pl-5 space-y-0.5">
            {errorList.map((msg, i) => (
              <li key={i}>{msg === '!' ? 'Campo requerido' : msg}</li>
            ))}
          </ul>
        </div>
      )}

      {step === 'path' && (
        <Step0Decision
          value={path}
          onChange={(p) => {
            setPath(p);
            setStep(p === 'supply' ? 'supply-line' : 'fabrication');
          }}
        />
      )}

      {step === 'supply-line' && (
        <div>
          <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-6">
            {tV2('supplyLineTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(['pesada', 'liviana'] as const).map((l) => {
              const sel = supply?.line === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => onSupplyLine(l)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all ${
                    sel
                      ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]/5'
                      : 'border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/40'
                  }`}
                >
                  <div className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-1">
                    {tV2(l === 'pesada' ? 'supplyHeavy' : 'supplyLight')}
                  </div>
                  <div className="text-sm text-[var(--text-tertiary)]">
                    {tV2(l === 'pesada' ? 'supplyHeavyDesc' : 'supplyLightDesc')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 'supply-heavy' && supply && (
        <SupplyHeavyForm
          value={supply.heavy ?? {}}
          onChange={(patch) =>
            setSupply({ ...supply, heavy: { ...(supply.heavy ?? {}), ...patch } as SupplyHeavyDetail })
          }
          freeText={supply.freeText}
          onFreeTextChange={(t) => setSupply({ ...supply, freeText: t })}
        />
      )}

      {step === 'supply-light' && supply && (
        <SupplyLightForm
          value={supply.light ?? {}}
          onChange={(patch) =>
            setSupply({ ...supply, light: { ...(supply.light ?? {}), ...patch } as SupplyLightDetail })
          }
          freeText={supply.freeText}
          onFreeTextChange={(t) => setSupply({ ...supply, freeText: t })}
        />
      )}

      {step === 'fabrication' && (
        <FabricationForm
          value={fabrication}
          onChange={(patch) => setFabrication({ ...fabrication, ...patch })}
        />
      )}

      {step === 'contact' && (
        <Step5Contact data={contact as never} errors={errors} onChange={(p) => setContact({ ...contact, ...p })} />
      )}

      <div className="mt-10 flex justify-between gap-3">
        {currentIdx > 0 ? (
          <Button
            variant="ghost"
            size="md"
            onClick={goBack}
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            {tc('back')}
          </Button>
        ) : (
          <div />
        )}

        {step !== 'contact' ? (
          <Button
            variant="primary"
            size="md"
            onClick={goNext}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {tc('continue')}
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={submit} disabled={submitting}>
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('step5Submit')}
          </Button>
        )}
      </div>
    </Card>
  );
}
