import heavy from '@/content/products/bandas-pesadas.json';
import light from '@/content/products/bandas-livianas.json';
import components from '@/content/products/componentes.json';
import services from '@/content/products/servicios.json';

export type ProductCategory = 'bandas-pesadas' | 'bandas-livianas' | 'componentes' | 'servicios';

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  slug: string;
  nameEs: string;
  nameEn: string;
  shortDescEs: string;
  shortDescEn: string;
  fullDescEs: string;
  fullDescEn: string;
  image: string;
  specs: ProductSpecs;
  applications: string[];
  whatsappMsgEs: string;
  whatsappMsgEn: string;
  category?: ProductCategory;
  updatedAt?: string;
}

export interface ProductCategoryData {
  category: ProductCategory;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  heroImage: string;
  catalogPdf?: string;
  updatedAt?: string;
  products: Product[];
}

// Per-product `specs` is a heterogeneous string map; TS's strict inference on the
// JSON shapes makes a direct cast complain. We're confident in the JSON contract,
// so funnel through `unknown` to satisfy the structural check.
const categories: Record<ProductCategory, ProductCategoryData> = {
  'bandas-pesadas': heavy as unknown as ProductCategoryData,
  'bandas-livianas': light as unknown as ProductCategoryData,
  'componentes': components as unknown as ProductCategoryData,
  'servicios': services as unknown as ProductCategoryData
};

export async function getCategories(): Promise<ProductCategoryData[]> {
  return Object.values(categories);
}

export async function getCategory(slug: ProductCategory): Promise<ProductCategoryData | null> {
  return categories[slug] || null;
}

export async function getProducts(): Promise<(Product & { category: ProductCategory })[]> {
  const all: (Product & { category: ProductCategory })[] = [];
  for (const [cat, data] of Object.entries(categories)) {
    for (const p of data.products) {
      all.push({ ...p, category: cat as ProductCategory, updatedAt: data.updatedAt });
    }
  }
  return all;
}

export async function getProductBySlug(
  category: ProductCategory,
  slug: string
): Promise<Product | null> {
  const cat = categories[category];
  if (!cat) return null;
  return cat.products.find((p) => p.slug === slug) || null;
}
