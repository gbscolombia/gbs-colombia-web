import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section, Heading } from '@/components/ui';
import { getCategories } from '@/lib/content/products';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('catalogTitle'), description: t('catalogDescription') };
}

const categoryHrefs: Record<string, string> = {
  'bandas-pesadas': '/catalogo/bandas-pesadas',
  'bandas-livianas': '/catalogo/bandas-livianas',
  'componentes': '/catalogo/componentes',
  'servicios': '/catalogo/servicios'
};

export default async function CatalogPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catalog');
  const categories = await getCategories();

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
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {categories.map((cat) => {
              const title = locale === 'en' ? cat.titleEn : cat.titleEs;
              const desc = locale === 'en' ? cat.descriptionEn : cat.descriptionEs;
              return (
                <Link
                  // @ts-expect-error — dynamic catalog pathname
                  href={categoryHrefs[cat.category]}
                  key={cat.category}
                  className="group relative rounded-2xl overflow-hidden bg-[var(--neutral-50)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30"
                >
                  <div className="aspect-[16/9] relative bg-[var(--brand-navy)]">
                    <Image
                      src={cat.heroImage}
                      alt={title}
                      fill
                      className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)]/80 to-transparent" />
                  </div>
                  <div className="p-6 lg:p-8">
                    <Heading level={2} size="md">
                      {title}
                    </Heading>
                    <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold group-hover:gap-2.5 transition-all">
                      {t('viewCategory')}
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
