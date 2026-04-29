'use client';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui';
import type { DiagnosticFormData } from '@/lib/diagnostic/diagnostic-data';

type Patch = Partial<
  Pick<DiagnosticFormData, 'name' | 'company' | 'whatsapp' | 'email' | 'role' | 'consent'>
>;

interface Props {
  data: Partial<DiagnosticFormData>;
  errors: Record<string, string>;
  onChange: (patch: Patch) => void;
}

export function Step5Contact({ data, errors, onChange }: Props) {
  const t = useTranslations('diagnostic');

  return (
    <div>
      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-8">
        {t('step5Title')}
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Input
          label={t('step5Name')}
          required
          value={data.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          error={errors.name}
        />
        <Input
          label={t('step5Company')}
          required
          value={data.company || ''}
          onChange={(e) => onChange({ company: e.target.value })}
          error={errors.company}
        />
        <Input
          label={t('step5Whatsapp')}
          required
          placeholder={t('step5WhatsappPlaceholder')}
          value={data.whatsapp || ''}
          onChange={(e) => onChange({ whatsapp: e.target.value })}
          error={errors.whatsapp}
        />
        <Input
          label={t('step5Email')}
          type="email"
          value={data.email || ''}
          onChange={(e) => onChange({ email: e.target.value })}
          error={errors.email}
        />
        <Input
          label={t('step5Role')}
          value={data.role || ''}
          onChange={(e) => onChange({ role: e.target.value })}
          className="md:col-span-2"
        />
      </div>

      <label className="mt-6 flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={!!data.consent}
          onChange={(e) => onChange({ consent: e.target.checked })}
          className="mt-1 w-5 h-5 rounded border-[var(--border-default)] text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]/30"
        />
        <span className="text-sm text-[var(--text-secondary)]">{t('step5Consent')}</span>
      </label>
    </div>
  );
}
