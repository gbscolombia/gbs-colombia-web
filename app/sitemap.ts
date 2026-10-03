import type { MetadataRoute } from 'next';
import { site } from '@/lib/constants/site';
import { routing } from '@/lib/i18n/routing';
import { getCategories, getProducts } from '@/lib/content/products';
import { getIndustries } from '@/lib/content/industries';
import { getCaseStudies } from '@/lib/content/cases';
import { pageUrl } from '@/lib/seo/alternates';

const STATIC_PATHS_ES = [
  '',
  '/nosotros',
  '/ingenieria',
  '/catalogo',
  '/industrias',
  '/casos-de-exito',
  '/recursos',
  '/recursos/glosario',
  '/diagnostico',
  '/contacto',
  '/politica-de-privacidad'
];

const STATIC_PATHS_EN: Record<string, string> = {
  '': '/en',
  '/nosotros': '/en/about',
  '/ingenieria': '/en/engineering',
  '/catalogo': '/en/catalog',
  '/industrias': '/en/industries',
  '/casos-de-exito': '/en/case-studies',
  '/recursos': '/en/resources',
  '/recursos/glosario': '/en/resources/glossary',
  '/diagnostico': '/en/diagnostic',
  '/contacto': '/en/contact',
  '/politica-de-privacidad': '/en/privacy-policy'
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const p of STATIC_PATHS_ES) {
    const enPath = STATIC_PATHS_EN[p];
    urls.push({
      url: `${site.url}${p || '/'}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: p === '' ? 1 : 0.8,
      alternates: {
        languages: {
          es: `${site.url}${p || '/'}`,
          en: `${site.url}${enPath}`
        }
      }
    });
  }

  const categories = await getCategories();
  const catUrlMap: Record<string, string> = {
    'bandas-pesadas': '/heavy-duty',
    'bandas-livianas': '/light-duty',
    'componentes': '/components',
    'servicios': '/services'
  };
  for (const cat of categories) {
    urls.push({
      url: `${site.url}/catalogo/${cat.category}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${site.url}/catalogo/${cat.category}`,
          en: `${site.url}/en/catalog${catUrlMap[cat.category]}`
        }
      }
    });
  }

  const products = await getProducts();
  for (const p of products) {
    const tpl = `/catalogo/${p.category}/[slug]`;
    urls.push({
      url: pageUrl('es', tpl, { slug: p.slug }),
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: pageUrl('es', tpl, { slug: p.slug }),
          en: pageUrl('en', tpl, { slug: p.slug })
        }
      }
    });
  }

  const industries = await getIndustries();
  for (const ind of industries) {
    urls.push({
      url: pageUrl('es', '/industrias/[slug]', { slug: ind.slug }),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: pageUrl('es', '/industrias/[slug]', { slug: ind.slug }),
          en: pageUrl('en', '/industrias/[slug]', { slug: ind.slug })
        }
      }
    });
  }

  const cases = await getCaseStudies();
  for (const c of cases) {
    urls.push({
      url: pageUrl('es', '/casos-de-exito/[slug]', { slug: c.slug }),
      lastModified: c.createdAt ? new Date(c.createdAt) : now,
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          es: pageUrl('es', '/casos-de-exito/[slug]', { slug: c.slug }),
          en: pageUrl('en', '/casos-de-exito/[slug]', { slug: c.slug })
        }
      }
    });
  }

  return urls;
}
