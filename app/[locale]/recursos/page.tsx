import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { BookOpen, FileText, Activity, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section, Card } from '@/components/ui';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('resourcesTitle'), description: t('resourcesDescription') };
}

export default async function ResourcesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('resources');

  const cards = [
    {
      icon: BookOpen,
      title: t('glossaryCard'),
      desc: t('glossaryCardDesc'),
      href: '/recursos/glosario' as const,
      accent: 'from-[var(--brand-navy)] to-[var(--brand-blue)]'
    },
    {
      icon: FileText,
      title: t('catalogsCard'),
      desc: t('catalogsCardDesc'),
      href: '/catalogo' as const,
      accent: 'from-[var(--brand-blue)] to-[var(--brand-cyan)]'
    },
    {
      icon: Activity,
      title: t('diagnosticCard'),
      desc: t('diagnosticCardDesc'),
      href: '/diagnostico' as const,
      accent: 'from-[var(--brand-blue-deep)] to-[var(--brand-navy)]'
    }
  ];

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
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <Link
                  key={i}
                  href={c.href}
                  className="group bg-white rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-28 bg-gradient-to-br ${c.accent} flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white/90" strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{c.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      {locale === 'en' ? 'Open' : 'Abrir'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
