import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Activity } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Button, Container, Section, Card } from '@/components/ui';
import { getCaseStudies } from '@/lib/content/cases';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('casesTitle'), description: t('casesDescription') };
}

export default async function CasesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cases');
  const cases = await getCaseStudies();

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

      <Section tone="white" padding="lg">
        <Container size="wide">
          {cases.length === 0 ? (
            <Card tone="neutral" padding="lg" className="text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-xl bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center mx-auto mb-5">
                <Activity className="w-7 h-7" />
              </div>
              <p className="text-[var(--text-secondary)] text-lg-fluid">{t('empty')}</p>
              <div className="mt-8">
                <Button
                  href="/diagnostico"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {locale === 'en' ? 'Start a project' : 'Iniciar un proyecto'}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((c) => {
                const title = locale === 'en' ? c.titleEn : c.titleEs;
                const summary = locale === 'en' ? c.summaryEn : c.summaryEs;
                return (
                  <Link
                    // @ts-expect-error — dynamic case pathname
                    href={`/casos-de-exito/${c.slug}`}
                    key={c.slug}
                    className="group bg-white rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                  >
                    <div className="aspect-[16/9] relative bg-[var(--neutral-100)]">
                      {c.heroImage && (
                        <Image src={c.heroImage} alt={title} fill className="object-cover" sizes="33vw" />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--brand-blue)] mb-2">
                        {[c.industry, c.year].filter(Boolean).join(' · ')}
                      </div>
                      <h2 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
                        {title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">{summary}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
