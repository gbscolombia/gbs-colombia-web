import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CheckCircle2, XCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Button, Container, Section, Card } from '@/components/ui';
import { isValidReferenceCode } from '@/lib/utils/reference-code';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  return { title: `Brief ${code}`, robots: { index: false, follow: false } };
}

export default async function VerifyPage({
  params
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('verify');
  const tWa = await getTranslations('whatsappFloat');
  const valid = isValidReferenceCode(code);

  return (
    <Section tone="neutral" padding="xl">
      <Container size="content">
        <Card tone="white" padding="lg" className="max-w-xl mx-auto">
          {valid ? (
            <>
              <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="text-center font-heading font-bold text-[var(--brand-navy)] text-3xl-fluid">
                {t('validTitle')}
              </h1>
              <p className="mt-3 text-center text-[var(--text-secondary)]">{t('validDescription')}</p>
              <div className="mt-6 p-5 rounded-xl bg-[var(--neutral-50)] text-center border border-[var(--border-subtle)]">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">
                  {locale === 'en' ? 'Code' : 'Código'}
                </div>
                <div className="font-heading font-bold text-[var(--brand-blue)] text-xl tracking-wide">
                  {code}
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  href={buildWhatsappUrl(`Hola GBS, tengo el brief ${code}`, site.whatsapp)}
                  variant="primary"
                  size="lg"
                  target="_blank"
                  icon={<MessageCircle className="w-5 h-5" />}
                  iconPosition="left"
                >
                  {t('ctaContact')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-[var(--danger)]/10 text-[var(--danger)] flex items-center justify-center mx-auto mb-5">
                <XCircle className="w-8 h-8" />
              </div>
              <h1 className="text-center font-heading font-bold text-[var(--brand-navy)] text-3xl-fluid">
                {t('invalidTitle')}
              </h1>
              <p className="mt-3 text-center text-[var(--text-secondary)]">{t('invalidDescription')}</p>
              <div className="mt-8 text-center">
                <Button
                  href="/diagnostico"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  {t('ctaNew')}
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>
    </Section>
  );
}
