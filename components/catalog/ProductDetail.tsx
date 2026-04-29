import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MessageCircle, Check, ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button, Container, Section, Heading, Breadcrumbs, Card } from '@/components/ui';
import { getCategory, getProductBySlug, type ProductCategory } from '@/lib/content/products';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export async function renderProductMetadata(category: ProductCategory, slug: string, locale: string) {
  const product = await getProductBySlug(category, slug);
  if (!product) return {};
  return {
    title: locale === 'en' ? product.nameEn : product.nameEs,
    description: locale === 'en' ? product.shortDescEn : product.shortDescEs
  };
}

interface Props {
  category: ProductCategory;
  slug: string;
}

export async function ProductDetail({ category, slug }: Props) {
  const locale = await getLocale();
  const t = await getTranslations('catalog');
  const product = await getProductBySlug(category, slug);
  if (!product) notFound();
  const cat = await getCategory(category);
  if (!cat) notFound();

  const name = locale === 'en' ? product.nameEn : product.nameEs;
  const desc = locale === 'en' ? product.fullDescEn : product.fullDescEs;
  const catName = locale === 'en' ? cat.titleEn : cat.titleEs;
  const whatsappMsg = locale === 'en' ? product.whatsappMsgEn : product.whatsappMsgEs;
  const related = cat.products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Section tone="neutral" padding="sm">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: t('title'), href: '/catalogo' },
              { label: catName, href: `/catalogo/${category}` },
              { label: name }
            ]}
          />
        </Container>
      </Section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-10 lg:gap-16 items-start">
            <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 aspect-[4/3] max-h-[420px] rounded-2xl overflow-hidden bg-[var(--neutral-100)]">
              <Image
                src={product.image}
                alt={name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--brand-blue)]">
                {catName}
              </p>
              <h1 className="mt-3 font-heading font-bold text-[var(--brand-navy)] text-4xl-fluid leading-tight">
                {name}
              </h1>
              <p className="mt-5 text-[var(--text-secondary)] text-lg-fluid leading-relaxed">{desc}</p>

              <Button
                href={buildWhatsappUrl(whatsappMsg, site.whatsapp)}
                variant="primary"
                size="lg"
                className="mt-8"
                icon={<MessageCircle className="w-5 h-5" />}
                iconPosition="left"
                target="_blank"
              >
                {t('quoteViaWhatsapp')}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card tone="white" padding="lg">
              <Heading level={2} size="md">
                {t('specsTitle')}
              </Heading>
              <dl className="mt-6 divide-y divide-[var(--border-subtle)]">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-[var(--text-tertiary)] capitalize">{k.replace(/_/g, ' ')}</dt>
                    <dd className="font-semibold text-[var(--text-primary)] text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card tone="white" padding="lg">
              <Heading level={2} size="md">
                {t('applicationsTitle')}
              </Heading>
              <ul className="mt-6 space-y-3">
                {product.applications.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-[var(--text-primary)]">{a}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="white" padding="lg">
          <Container size="wide">
            <Heading level={2} size="lg" className="mb-8">
              {t('relatedProducts')}
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => {
                const n = locale === 'en' ? p.nameEn : p.nameEs;
                return (
                  <Link
                    // @ts-expect-error — dynamic catalog pathname
                    href={`/catalogo/${category}/${p.slug}`}
                    key={p.slug}
                    className="group block bg-[var(--neutral-50)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 transition-all"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image src={p.image} alt={n} fill className="object-cover" sizes="33vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-[var(--brand-navy)] mb-2">{n}</h3>
                      <span className="inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold text-sm group-hover:gap-2.5 transition-all">
                        {t('viewProduct')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

export async function generateProductParams(category: ProductCategory) {
  const cat = await getCategory(category);
  if (!cat) return [];
  return cat.products.map((p) => ({ slug: p.slug }));
}
