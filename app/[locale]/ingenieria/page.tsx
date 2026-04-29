import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Activity, ClipboardCheck, Ruler, Factory, Wrench, HeartPulse, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button, Container, Section, Heading } from '@/components/ui';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('engineeringTitle'), description: t('engineeringDescription') };
}

export default async function EngineeringPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('engineering');

  const steps = [
    { icon: ClipboardCheck, title: t('processStep1'), desc: t('processStep1Desc') },
    { icon: Ruler, title: t('processStep2'), desc: t('processStep2Desc') },
    { icon: Activity, title: t('processStep3'), desc: t('processStep3Desc') },
    { icon: Factory, title: t('processStep4'), desc: t('processStep4Desc') },
    { icon: Wrench, title: t('processStep5'), desc: t('processStep5Desc') },
    { icon: HeartPulse, title: t('processStep6'), desc: t('processStep6Desc') }
  ];

  return (
    <>
      <Section tone="navy" padding="xl">
        <Container size="content">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-5">
            {t('kicker')}
          </p>
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance max-w-3xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-white/85 text-lg-fluid max-w-3xl leading-relaxed">
            {t('heroDescription')}
          </p>
        </Container>
      </Section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Heading level={2} size="xl">
              {t('processTitle')}
            </Heading>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={i}
                  className="relative bg-[var(--neutral-50)] rounded-2xl p-6 lg:p-7 border-t-[3px] border-[var(--brand-blue)]"
                >
                  <div className="absolute -top-5 -right-2 text-6xl font-heading font-bold text-[var(--brand-blue)]/10 leading-none select-none">
                    {i + 1}
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-[var(--brand-navy)] text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <Heading level={2} size="lg">
                {t('standardsTitle')}
              </Heading>
              <ul className="mt-6 space-y-3">
                {['CEMA Belt Book 7ma Ed.', 'DIN 22102', 'ISO 14890', 'FDA (aplicable a livianas)', 'AISI 304'].map(
                  (s, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                      <ShieldCheck className="w-5 h-5 text-[var(--brand-blue)] flex-shrink-0" />
                      <span className="font-semibold">{s}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <Heading level={2} size="lg">
                {t('diffTitle')}
              </Heading>
              <ul className="mt-6 space-y-3">
                {[
                  locale === 'en' ? 'AISI 304 Stainless steel by default' : 'Acero inoxidable AISI 304 por defecto',
                  locale === 'en' ? 'Bolted construction first' : 'Construcción atornillada primero',
                  locale === 'en' ? 'Modular and scalable design' : 'Diseño modular y escalable',
                  locale === 'en' ? 'Maintainability prioritized' : 'Mantenibilidad priorizada'
                ].map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                    <ShieldCheck className="w-5 h-5 text-[var(--brand-blue)] flex-shrink-0" />
                    <span className="font-semibold">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="blue" padding="lg">
        <Container size="content">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-bold text-white text-3xl-fluid md:text-4xl-fluid leading-tight text-balance">
              {t('ctaTitle')}
            </h2>
            <p className="mt-5 text-white/90 text-lg-fluid">{t('ctaDescription')}</p>
            <div className="mt-8">
              <Button
                href="/diagnostico"
                variant="white"
                size="xl"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {t('ctaTitle')}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
