import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  HeroSection,
  ClientsBar,
  StatsBar,
  DiagnosticoCTA,
  AssistantTeaser,
  ValuePillars,
  PortfolioGrid,
  IndustriesGrid,
  EngineeringPhilosophy,
  SocialMediaSection,
  FinalCTA
} from '@/components/sections';
import { pageAlternates } from '@/lib/seo/alternates';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: { absolute: t('homeSeoTitle') },
    description: t('homeSeoDescription'),
    alternates: pageAlternates(locale, '/')
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ClientsBar />
      <StatsBar />
      <DiagnosticoCTA />
      <AssistantTeaser />
      <ValuePillars />
      <PortfolioGrid />
      <IndustriesGrid />
      <EngineeringPhilosophy />
      <SocialMediaSection />
      <FinalCTA />
    </>
  );
}
