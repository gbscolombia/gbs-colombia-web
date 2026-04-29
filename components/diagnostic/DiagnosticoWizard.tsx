'use client';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Step1Operation } from './steps/Step1Operation';
import { Step2Material } from './steps/Step2Material';
import { Step3Conditions } from './steps/Step3Conditions';
import { Step4Dimensions } from './steps/Step4Dimensions';
import { Step5Contact } from './steps/Step5Contact';
import { BriefView } from './BriefView';
import { Button, Card } from '@/components/ui';
import type {
  DiagnosticBrief,
  DiagnosticFormData,
  OperationType,
  ConditionKey,
  Speed
} from '@/lib/diagnostic/diagnostic-data';
import { analytics } from '@/components/analytics/events';

const TOTAL = 5;

export function DiagnosticoWizard() {
  const t = useTranslations('diagnostic');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<DiagnosticFormData>>({
    conditions: [],
    locale: locale === 'en' ? 'en' : 'es'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brief, setBrief] = useState<DiagnosticBrief | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    analytics.diagnosticStarted();
  }, []);

  const patch = (p: Partial<DiagnosticFormData>) => setData((d) => ({ ...d, ...p }));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1 && !data.operation) e.operation = '!';
    if (s === 2) {
      if (!data.material) e.material = t('errors.materialRequired');
      if (data.material === 'otro' && !data.materialOtherText) e.material = t('errors.materialRequired');
    }
    if (s === 4) {
      if (!data.widthMm) e.width = t('errors.widthRequired');
      if (data.widthMm === -1 && !data.widthOtherText) e.width = t('errors.widthRequired');
      if (!data.lengthMeters || data.lengthMeters <= 0) e.length = t('errors.lengthRequired');
    }
    if (s === 5) {
      if (!data.name) e.name = t('errors.nameRequired');
      if (!data.company) e.company = t('errors.companyRequired');
      if (!data.whatsapp) e.whatsapp = t('errors.whatsappRequired');
      else if (!/^[+]?[\d\s-]{7,20}$/.test(data.whatsapp)) e.whatsapp = t('errors.whatsappInvalid');
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t('errors.emailInvalid');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    analytics.diagnosticStepCompleted(step, `step${step}`);
    setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateStep(5)) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/diagnostico/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('submit failed');
      const body = (await res.json()) as { brief: DiagnosticBrief };
      setBrief(body.brief);
      analytics.diagnosticCompleted(body.brief.code, {
        operation: body.brief.operation,
        material: body.brief.material,
        conditions: body.brief.conditions,
        width: body.brief.widthMm,
        length: body.brief.lengthMeters
      });
    } catch {
      setErrors({ submit: 'submit failed' });
    } finally {
      setSubmitting(false);
    }
  };

  if (brief) return <BriefView brief={brief} />;

  return (
    <Card tone="white" padding="lg" className="max-w-3xl mx-auto">
      <ProgressBar current={step} total={TOTAL} />

      {step === 1 && (
        <Step1Operation
          value={data.operation}
          onChange={(v: OperationType) => patch({ operation: v })}
        />
      )}
      {step === 2 && (
        <Step2Material
          operation={data.operation}
          value={data.material}
          otherText={data.materialOtherText}
          onChange={(material, otherText) => patch({ material, materialOtherText: otherText })}
        />
      )}
      {step === 3 && (
        <Step3Conditions
          value={(data.conditions || []) as ConditionKey[]}
          onChange={(conditions) => patch({ conditions })}
        />
      )}
      {step === 4 && (
        <Step4Dimensions
          widthMm={data.widthMm}
          widthOtherText={data.widthOtherText}
          lengthMeters={data.lengthMeters}
          speed={data.speed as Speed}
          onChange={patch}
        />
      )}
      {step === 5 && <Step5Contact data={data} errors={errors} onChange={patch} />}

      <div className="mt-10 flex justify-between gap-3">
        {step > 1 ? (
          <Button
            variant="ghost"
            size="md"
            onClick={prev}
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            {tc('back')}
          </Button>
        ) : (
          <div />
        )}
        {step < TOTAL ? (
          <Button
            variant="primary"
            size="md"
            onClick={next}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            disabled={!data.operation && step === 1}
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
