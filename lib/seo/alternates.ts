import { routing } from '@/lib/i18n/routing';
import { site } from '@/lib/constants/site';

type Loc = 'es' | 'en';

const pathnames = routing.pathnames as unknown as Record<string, string | Record<Loc, string>>;

/**
 * Localized path (with the /en prefix when needed) for an internal route template
 * such as '/catalogo/bandas-pesadas/[slug]'. Templates missing from routing.pathnames
 * fall back to the Spanish path, which is how those pages resolve under /en today.
 */
export function pagePath(
  locale: string,
  template: string,
  params: Record<string, string> = {}
): string {
  const l: Loc = locale === 'en' ? 'en' : 'es';
  const entry = pathnames[template];
  let p = typeof entry === 'string' ? entry : entry ? entry[l] : template;
  for (const [k, v] of Object.entries(params)) p = p.replace(`[${k}]`, encodeURIComponent(v));
  if (p === '/') p = '';
  return l === 'en' ? `/en${p}` : p || '/';
}

export function pageUrl(
  locale: string,
  template: string,
  params: Record<string, string> = {}
): string {
  return `${site.url}${pagePath(locale, template, params)}`;
}

/** Per-page canonical + hreflang (self-referencing canonical, ES/EN alternates, x-default = ES). */
export function pageAlternates(
  locale: string,
  template: string,
  params: Record<string, string> = {}
) {
  return {
    canonical: pagePath(locale, template, params),
    languages: {
      es: pagePath('es', template, params),
      en: pagePath('en', template, params),
      'x-default': pagePath('es', template, params)
    }
  };
}
