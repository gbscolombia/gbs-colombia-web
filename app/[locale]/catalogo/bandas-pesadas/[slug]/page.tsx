import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProductDetail, renderProductMetadata, generateProductParams } from '@/components/catalog/ProductDetail';

export async function generateStaticParams() {
  return generateProductParams('bandas-pesadas');
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return renderProductMetadata('bandas-pesadas', slug, locale);
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ProductDetail category="bandas-pesadas" slug={slug} />;
}
