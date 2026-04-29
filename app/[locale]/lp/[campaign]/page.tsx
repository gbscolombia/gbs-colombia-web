import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Activity, MessageCircle, Check, ShieldCheck } from 'lucide-react';
import { Button, Container, Section } from '@/components/ui';
import { LandingTracker } from '@/components/landing/LandingTracker';
import { getLandings, getLandingBySlug } from '@/lib/content/landings';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export async function generateStaticParams() {
  const campaigns = await getLandings();
  return campaigns.map((c) => ({ campaign: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; campaign: string }>;
}): Promise<Metadata> {
  const { locale, campaign } = await params;
  const lp = await getLandingBySlug(campaign);
  if (!lp) return {};
  return {
    title: locale === 'en' ? lp.titleEn : lp.titleEs,
    description: locale === 'en' ? lp.subtitleEn : lp.subtitleEs,
    robots: { index: false, follow: false }
  };
}

export default async function LandingPage({
  params
}: {
  params: Promise<{ locale: string; campaign: string }>;
}) {
  const { locale, campaign } = await params;
  setRequestLocale(locale);
  const lp = await getLandingBySlug(campaign);
  if (!lp) notFound();

  const t = await getTranslations('landing');
  const tWa = await getTranslations('whatsappFloat');

  const title = locale === 'en' ? lp.titleEn : lp.titleEs;
  const subtitle = locale === 'en' ? lp.subtitleEn : lp.subtitleEs;
  const kicker = locale === 'en' ? lp.kickerEn : lp.kickerEs;

  return (
    <>
      <LandingTracker campaign={campaign} />

      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[var(--brand-navy)]">
        <div className="absolute inset-0">
          <Image src={lp.heroImage} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(10,37,64,0.92) 0%, rgba(10,37,64,0.7) 60%, rgba(30,95,158,0.55) 100%)'
            }}
          />
        </div>
        <Container size="content" className="relative z-10 py-20 lg:py-28">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-5">
            {kicker}
          </p>
          <h1 className="font-heading font-bold text-white text-hero leading-[1.05] text-balance">
            {title}
          </h1>
          <p className="mt-6 text-white/90 text-lg-fluid max-w-2xl leading-relaxed">{subtitle}</p>

          <ul className="mt-8 space-y-3">
            {lp.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-white/90">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
                <span>{locale === 'en' ? b.en : b.es}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              href={buildWhatsappUrl(`${tWa('defaultMessage')} (${campaign})`, site.whatsapp)}
              variant="primary"
              size="xl"
              icon={<MessageCircle className="w-5 h-5" />}
              iconPosition="left"
              target="_blank"
            >
              {t('defaultCTA')}
            </Button>
            <Button
              href="/diagnostico"
              variant="whiteOutline"
              size="xl"
              icon={<Activity className="w-5 h-5" />}
              iconPosition="left"
            >
              {locale === 'en' ? 'Free diagnostic' : 'Diagnóstico gratis'}
            </Button>
          </div>
        </Container>
      </section>

      <Section tone="white" padding="lg">
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto">
            <ShieldCheck className="w-10 h-10 text-[var(--brand-blue)] mx-auto mb-5" />
            <h2 className="font-heading font-bold text-[var(--brand-navy)] text-3xl-fluid leading-tight">
              {locale === 'en' ? 'Engineering with international backing' : 'Ingeniería con respaldo internacional'}
            </h2>
            <p className="mt-5 text-[var(--text-secondary)] text-lg-fluid leading-relaxed">
              {locale === 'en'
                ? 'GBS Colombia is part of GBS International Group. CEMA-compliant designs, AISI 304 stainless steel, bolted construction, and direct technical support.'
                : 'GBS Colombia es parte de GBS International Group. Diseños bajo norma CEMA, acero inoxidable AISI 304, construcción atornillada y soporte técnico directo.'}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
