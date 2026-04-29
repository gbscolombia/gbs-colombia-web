import { setRequestLocale } from 'next-intl/server';
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
