import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container, Section } from '@/components/ui';
import { AssistantChat } from '@/components/assistant/AssistantChat';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'assistant' });
  return {
    title: t('title'),
    description: t('subtitle'),
    robots: { index: true, follow: true }
  };
}

export default async function AssistantPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('assistant');

  return (
    <>
      <Section tone="navy" padding="lg">
        <Container size="content">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-5 text-center">
            {t('kicker')}
          </p>
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance text-center">
            {t('title')}
          </h1>
          <p className="mt-5 text-white/85 text-lg-fluid leading-relaxed text-center max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <AssistantChat />
        </Container>
      </Section>
    </>
  );
}
