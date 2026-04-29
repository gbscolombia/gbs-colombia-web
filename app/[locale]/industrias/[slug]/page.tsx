import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Check, MessageCircle, Factory, Pickaxe, Utensils, Package, Anchor, FlaskConical, Building2, Truck, Boxes } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Button, Container, Section, Heading, Breadcrumbs, Card } from '@/components/ui';
import { getIndustries, getIndustryBySlug } from '@/lib/content/industries';
import { getProducts } from '@/lib/content/products';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

const iconMap = { Factory, Pickaxe, Utensils, Package, Anchor, FlaskConical, Building2, Truck, Boxes } as const;

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const ind = await getIndustryBySlug(slug);
  if (!ind) return {};
  return {
    title: locale === 'en' ? ind.nameEn : ind.nameEs,
    description: locale === 'en' ? ind.shortDescEn : ind.shortDescEs
  };
}

export default async function IndustryDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const ind = await getIndustryBySlug(slug);
  if (!ind) notFound();

  const t = await getTranslations('industries');
  const tCat = await getTranslations('catalog');
  const tWa = await getTranslations('whatsappFloat');
  const allProducts = await getProducts();
  const recommended = allProducts.filter((p) => ind.recommendedProducts.includes(p.slug));
  const Icon = iconMap[ind.icon as keyof typeof iconMap] || Factory;

  const name = locale === 'en' ? ind.nameEn : ind.nameEs;
  const fullDesc = locale === 'en' ? ind.fullDescEn : ind.fullDescEs;

  return (
    <>
      <Section tone="neutral" padding="sm">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: t('title'), href: '/industrias' },
              { label: name }
            ]}
          />
        </Container>
      </Section>

      <Section tone="navy" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h1 className="font-heading font-bold text-white text-display leading-tight text-balance">
                {name}
              </h1>
              <p className="mt-6 text-white/85 text-lg-fluid leading-relaxed max-w-xl">{fullDesc}</p>
              <Button
                href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
                variant="primary"
                size="lg"
                className="mt-8"
                icon={<MessageCircle className="w-5 h-5" />}
                iconPosition="left"
                target="_blank"
              >
                {tCat('quoteViaWhatsapp')}
              </Button>
            </div>
            {ind.heroImage && (
              <div className="relative w-full max-w-[440px] mx-auto aspect-[4/3] max-h-[330px] rounded-2xl overflow-hidden hidden lg:block">
                <Image
                  src={ind.heroImage}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 440px"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card tone="neutral" padding="lg">
              <Heading level={2} size="md">
                {t('conditionsTitle')}
              </Heading>
              <ul className="mt-6 space-y-3">
                {ind.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-[var(--text-primary)]">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card tone="neutral" padding="lg">
              <Heading level={2} size="md">
                {t('productsTitle')}
              </Heading>
              <ul className="mt-6 space-y-3">
                {recommended.map((p) => {
                  const n = locale === 'en' ? p.nameEn : p.nameEs;
                  return (
                    <li key={p.slug}>
                      <Link
                        // @ts-expect-error — dynamic catalog pathname
                        href={`/catalogo/${p.category}/${p.slug}`}
                        className="group flex items-center justify-between gap-3 py-3 border-b border-[var(--border-subtle)] last:border-0 hover:text-[var(--brand-blue)] transition-colors"
                      >
                        <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-blue)]">
                          {n}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[var(--brand-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
