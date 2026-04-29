import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container, Section, Heading, Card } from '@/components/ui';
import { Globe2, Target, Eye, ShieldCheck } from 'lucide-react';
import { site, yearsOperating } from '@/lib/constants/site';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('aboutTitle'), description: t('aboutDescription') };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

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
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            <div>
              <div className="text-3xl-fluid font-heading font-bold text-white">{yearsOperating}+</div>
              <div className="text-sm text-white/70 mt-1">{locale === 'en' ? 'Years' : 'Años'}</div>
            </div>
            <div>
              <div className="text-3xl-fluid font-heading font-bold text-white">CEMA</div>
              <div className="text-sm text-white/70 mt-1">{locale === 'en' ? 'Standard' : 'Norma'}</div>
            </div>
            <div>
              <div className="text-3xl-fluid font-heading font-bold text-white">{site.city}</div>
              <div className="text-sm text-white/70 mt-1">{locale === 'en' ? 'HQ' : 'Sede'}</div>
            </div>
            <div>
              <div className="text-3xl-fluid font-heading font-bold text-white">GBS</div>
              <div className="text-sm text-white/70 mt-1">{locale === 'en' ? 'Group' : 'Grupo'}</div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid md:grid-cols-2 gap-6">
            <Card tone="outline" padding="lg">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <Heading level={2} size="md">
                {t('missionTitle')}
              </Heading>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">{t('missionText')}</p>
            </Card>
            <Card tone="outline" padding="lg">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <Heading level={2} size="md">
                {t('visionTitle')}
              </Heading>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">{t('visionText')}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <Heading level={2} size="lg">
              {t('valuesTitle')}
            </Heading>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[t('value1'), t('value2'), t('value3'), t('value4')].map((v, i) => (
              <Card key={i} tone="white" padding="md">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-navy)] text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="font-heading font-semibold text-[var(--brand-navy)]">{v}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--neutral-100)]">
              <Image
                src="/images/hero/Container-Warehouse.jpg"
                alt="GBS International Group"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[var(--brand-blue)] mb-3">
                <Globe2 className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">{t('groupTitle')}</span>
              </div>
              <Heading level={2} size="lg">
                {t('groupTitle')}
              </Heading>
              <p className="mt-6 text-[var(--text-secondary)] leading-relaxed text-lg-fluid">
                {t('groupText')}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
