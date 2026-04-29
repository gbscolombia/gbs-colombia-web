import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Factory, Pickaxe, Utensils, Package, Anchor, FlaskConical, Building2, Truck, Boxes, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section } from '@/components/ui';
import { getIndustries } from '@/lib/content/industries';

const iconMap = { Factory, Pickaxe, Utensils, Package, Anchor, FlaskConical, Building2, Truck, Boxes } as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('industriesTitle'), description: t('industriesDescription') };
}

export default async function IndustriesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('industries');
  const industries = await getIndustries();

  return (
    <>
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden bg-[var(--brand-navy)]">
        <div className="absolute inset-0">
          <Image
            src="/images/industries/banda-caucho-lona.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,37,64,0.35) 0%, rgba(10,37,64,0.85) 80%)'
            }}
          />
        </div>
        <Container size="content" className="relative z-10 py-16 lg:py-24">
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance">
            {t('title')}
          </h1>
          <p className="mt-6 text-white/90 text-lg-fluid max-w-2xl leading-relaxed">{t('subtitle')}</p>
        </Container>
      </section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => {
              const Icon = iconMap[ind.icon as keyof typeof iconMap] || Factory;
              const name = locale === 'en' ? ind.nameEn : ind.nameEs;
              const desc = locale === 'en' ? ind.shortDescEn : ind.shortDescEs;
              return (
                <Link
                  // @ts-expect-error — dynamic industry pathname
                  href={`/industrias/${ind.slug}`}
                  key={ind.slug}
                  className="group bg-white rounded-2xl p-6 lg:p-7 border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-navy)] text-white flex items-center justify-center mb-5 group-hover:bg-[var(--brand-blue)] transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
                    {name}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold text-sm group-hover:gap-2.5 transition-all">
                    {locale === 'en' ? 'View' : 'Ver'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
