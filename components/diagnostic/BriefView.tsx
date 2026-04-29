'use client';
import { useTranslations } from 'next-intl';
import { CheckCircle2, MessageCircle, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Card } from '@/components/ui';
import type { DiagnosticBrief } from '@/lib/diagnostic/diagnostic-data';
import { briefVerifyUrl, buildWhatsappMessage } from '@/lib/diagnostic/brief-generator';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';
import { analytics } from '@/components/analytics/events';

interface Props {
  brief: DiagnosticBrief;
}

export function BriefView({ brief }: Props) {
  const t = useTranslations('diagnostic');

  const pdfUrl = `/api/diagnostico/pdf/${brief.code}?data=${encodeURIComponent(JSON.stringify(brief))}`;
  const whatsappUrl = buildWhatsappUrl(buildWhatsappMessage(brief), site.whatsapp);

  return (
    <Card tone="white" padding="lg" className="max-w-2xl mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-[var(--brand-navy)] text-3xl-fluid">{t('briefReady')}</h2>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-blue-deep)] text-white">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">{t('briefRefLabel')}</div>
            <div className="font-heading font-bold text-xl md:text-2xl tracking-wide">{brief.code}</div>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG value={briefVerifyUrl(brief.code)} size={72} level="M" />
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-center text-[var(--text-secondary)]">{t('briefResponseTime')}</p>

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
        <a
          href={pdfUrl}
          download={`GBS-Brief-${brief.code}.pdf`}
          onClick={() => analytics.diagnosticDownloadedOnly(brief.code)}
          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg border border-[var(--border-default)] text-[var(--text-primary)] font-semibold hover:bg-[var(--neutral-50)] transition-colors"
        >
          <Download className="w-4 h-4" />
          {t('briefDownloadOnly')}
        </a>
      </div>
    </Card>
  );
}
