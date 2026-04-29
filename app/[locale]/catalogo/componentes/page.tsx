import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CategoryPage, renderCategoryMetadata } from '@/components/catalog/CategoryPage';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return renderCategoryMetadata('componentes', locale);
}

export default async function ComponentsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CategoryPage category="componentes" />;
}
