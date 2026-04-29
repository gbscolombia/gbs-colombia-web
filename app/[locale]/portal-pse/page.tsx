import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CreditCard, MessageCircle, Lock, HelpCircle } from 'lucide-react';
import { Button, Container, Section, Card } from '@/components/ui';
import { PaymentTabs } from '@/components/payment/PaymentTabs';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('paymentTitle'),
    description: t('paymentDescription'),
    robots: { index: true, follow: true }
  };
}

export default async function PaymentPortalPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('paymentPortal');
  const tWa = await getTranslations('whatsappFloat');

  return (
    <>
      <Section tone="navy" padding="lg">
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/15 text-white flex items-center justify-center mx-auto mb-5">
              <CreditCard className="w-8 h-8" />
            </div>
            <h1 className="font-heading font-bold text-white text-display leading-tight text-balance">
              {t('title')}
            </h1>
            <p className="mt-5 text-white/85 text-lg-fluid leading-relaxed">{t('subtitle')}</p>
          </div>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="content">
          <Card tone="white" padding="lg" className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-6 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Lock className="w-4 h-4 text-[var(--success)]" />
                {t('secureLabel')}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                  {t('providerLabel')}
                </span>
                <span className="font-heading font-bold text-[var(--brand-navy)]">Openpay · Bancolombia · Bre-B</span>
              </div>
            </div>

            <div className="py-8">
              <PaymentTabs />
            </div>

            <p className="mt-2 text-xs text-center text-[var(--text-tertiary)] leading-relaxed">
              {t('fineprint')}
            </p>
          </Card>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <HelpCircle className="w-4 h-4" />
              <span>
                {t('needInvoice')} {t('contactAdvice')}
              </span>
            </div>
            <Button
              href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
              variant="primary"
              size="md"
              target="_blank"
              icon={<MessageCircle className="w-4 h-4" />}
              iconPosition="left"
            >
              WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
