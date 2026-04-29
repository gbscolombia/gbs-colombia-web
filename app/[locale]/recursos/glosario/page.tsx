import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container, Section } from '@/components/ui';
import { GlossarySearch } from '@/components/glossary/GlossarySearch';
import { getGlossaryTerms } from '@/lib/content/glossary';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('glossaryTitle'), description: t('glossaryDescription') };
}

export default async function GlossaryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('glossary');
  const terms = await getGlossaryTerms();

  return (
    <>
      <Section tone="navy" padding="xl">
        <Container size="content">
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance">
            {t('title')}
          </h1>
          <p className="mt-6 text-white/85 text-lg-fluid max-w-2xl leading-relaxed">{t('subtitle')}</p>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <GlossarySearch terms={terms} />
        </Container>
      </Section>
    </>
  );
}
