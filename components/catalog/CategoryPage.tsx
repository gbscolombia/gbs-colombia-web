import type { Metadata } from 'next';
import Image from 'next/image';
import { Download, MessageCircle } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Button, Container, Section, Heading } from '@/components/ui';
import { ProductCard } from '@/components/catalog/ProductCard';
import { getCategory, type ProductCategory } from '@/lib/content/products';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export async function renderCategoryMetadata(
  category: ProductCategory,
  locale: string
): Promise<Metadata> {
  const cat = await getCategory(category);
  if (!cat) return {};
  const title = locale === 'en' ? cat.titleEn : cat.titleEs;
  const description = locale === 'en' ? cat.descriptionEn : cat.descriptionEs;
  return { title, description };
}

export async function CategoryPage({ category }: { category: ProductCategory }) {
  const locale = await getLocale();
  const t = await getTranslations('catalog');
  const tWa = await getTranslations('whatsappFloat');
  const cat = await getCategory(category);
  if (!cat) return null;

  const title = locale === 'en' ? cat.titleEn : cat.titleEs;
  const desc = locale === 'en' ? cat.descriptionEn : cat.descriptionEs;

  return (
    <>
      <Section tone="navy" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-16 items-center">
            <div className="relative z-10">
              <h1 className="font-heading font-bold text-white text-display leading-tight text-balance">
                {title}
              </h1>
              <p className="mt-6 text-white/85 text-lg-fluid leading-relaxed max-w-xl">{desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {cat.catalogPdf && (
                  <Button
                    href={cat.catalogPdf}
                    variant="primary"
                    size="md"
                    icon={<Download className="w-4 h-4" />}
                    iconPosition="left"
                    target="_blank"
                  >
                    {t('downloadCatalog')}
                  </Button>
                )}
                <Button
                  href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
                  variant="whiteOutline"
                  size="md"
                  icon={<MessageCircle className="w-4 h-4" />}
                  iconPosition="left"
                  target="_blank"
                >
                  {t('quoteViaWhatsapp')}
                </Button>
              </div>
            </div>
            <div className="relative w-full max-w-[480px] mx-auto aspect-[4/3] max-h-[360px] rounded-2xl overflow-hidden hidden lg:block">
              <Image src={cat.heroImage} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 0px, 480px" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <div className="mb-10">
            <Heading level={2} size="lg">
              {locale === 'en' ? 'Products' : 'Productos'}
            </Heading>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.products.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                category={category}
                locale={locale}
                viewLabel={t('viewProduct')}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
