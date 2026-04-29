'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, MessageCircle, MailCheck, Download, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Card } from '@/components/ui';
import type { DiagnosticBriefV2 } from '@/lib/diagnostic/diagnostic-data';
import { briefVerifyUrl, buildWhatsappMessageV2 } from '@/lib/diagnostic/brief-generator';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';
import { analytics } from '@/components/analytics/events';
import { fmt } from '@/lib/diagnostic/formulas-cema';

export function BriefViewV2({ brief }: { brief: DiagnosticBriefV2 }) {
  const t = useTranslations('diagnostic');
  const tV2 = useTranslations('diagnosticV2');
  const whatsappUrl = buildWhatsappUrl(buildWhatsappMessageV2(brief), site.whatsapp);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const downloadPdf = async () => {
    if (downloading) return;
    setDownloadError(null);
    setDownloading(true);
    try {
      const res = await fetch('/api/diagnostico/pdf-v2', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ brief })
      });
      if (!res.ok) throw new Error('pdf failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GBS-Brief-${brief.code}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      analytics.diagnosticDownloadedOnly(brief.code);
    } catch {
      setDownloadError('No pudimos generar el PDF. Intenta de nuevo.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card tone="white" padding="lg" className="max-w-2xl mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-[var(--brand-navy)] text-3xl-fluid">
          {tV2('emailSentTitle')}
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">{tV2('emailSentDesc')}</p>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-blue-deep)] text-white">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
              {t('briefRefLabel')}
            </div>
            <div className="font-heading font-bold text-xl md:text-2xl tracking-wide">
              {brief.code}
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG value={briefVerifyUrl(brief.code)} size={72} level="M" />
          </div>
        </div>
      </div>

      {brief.cema && (
        <div className="mt-6 rounded-2xl border-2 border-[var(--brand-blue)]/20 p-5">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--brand-blue)] mb-3">
            {tV2('calcSectionTitle')}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Cell label={tV2('calcTph')} value={fmt(brief.cema.tph, 'TPH')} />
            <Cell label={tV2('calcPower')} value={fmt(brief.cema.powerKw, 'kW', 2)} />
            <Cell label={tV2('calcTorque')} value={fmt(brief.cema.torqueNm, 'Nm', 0)} />
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-3">{tV2('calcDisclaimer')}</p>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        <MailCheck className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
        <span>{t('briefResponseTime')}</span>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          href={whatsappUrl}
          variant="primary"
          size="lg"
          target="_blank"
          icon={<MessageCircle className="w-5 h-5" />}
          iconPosition="left"
          onClick={() => analytics.diagnosticConvertedWhatsapp(brief.code)}
        >
          {t('briefContinueWhatsapp')}
        </Button>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg border border-[var(--border-default)] text-[var(--text-primary)] font-semibold hover:bg-[var(--neutral-50)] transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generando PDF…
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {t('briefDownloadOnly')}
            </>
          )}
        </button>
        {downloadError && (
          <p className="text-sm text-[var(--danger)] text-center">{downloadError}</p>
        )}
      </div>
    </Card>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">{label}</div>
      <div className="font-heading font-bold text-base text-[var(--brand-navy)]">{value}</div>
    </div>
  );
}
