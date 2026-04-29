import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container, Section } from '@/components/ui';
import { DiagnosticoWizardV2 } from '@/components/diagnostic/DiagnosticoWizardV2';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('diagnosticTitle'), description: t('diagnosticDescription') };
}

export default async function DiagnosticoPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('diagnostic');

  return (
    <>
      <Section tone="navy" padding="lg">
        <Container size="content">
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance text-center">
            {t('pageTitle')}
          </h1>
          <p className="mt-5 text-white/85 text-lg-fluid leading-relaxed text-center max-w-2xl mx-auto">
            {t('pageSubtitle')}
          </p>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <DiagnosticoWizardV2 />
        </Container>
      </Section>
    </>
  );
}
