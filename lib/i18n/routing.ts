import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/nosotros': { es: '/nosotros', en: '/about' },
    '/ingenieria': { es: '/ingenieria', en: '/engineering' },
    '/catalogo': { es: '/catalogo', en: '/catalog' },
    '/catalogo/bandas-pesadas': { es: '/catalogo/bandas-pesadas', en: '/catalog/heavy-duty' },
    '/catalogo/bandas-livianas': { es: '/catalogo/bandas-livianas', en: '/catalog/light-duty' },
    '/catalogo/componentes': { es: '/catalogo/componentes', en: '/catalog/components' },
    '/catalogo/servicios': { es: '/catalogo/servicios', en: '/catalog/services' },
    '/catalogo/bandas-pesadas/[slug]': {
      es: '/catalogo/bandas-pesadas/[slug]',
      en: '/catalog/heavy-duty/[slug]'
    },
    '/catalogo/bandas-livianas/[slug]': {
      es: '/catalogo/bandas-livianas/[slug]',
      en: '/catalog/light-duty/[slug]'
    },
    '/industrias': { es: '/industrias', en: '/industries' },
    '/industrias/[slug]': { es: '/industrias/[slug]', en: '/industries/[slug]' },
    '/casos-de-exito': { es: '/casos-de-exito', en: '/case-studies' },
    '/casos-de-exito/[slug]': { es: '/casos-de-exito/[slug]', en: '/case-studies/[slug]' },
    '/diagnostico': { es: '/diagnostico', en: '/diagnostic' },
    '/asistente-ia': { es: '/asistente-ia', en: '/ai-assistant' },
    '/recursos': { es: '/recursos', en: '/resources' },
    '/recursos/glosario': { es: '/recursos/glosario', en: '/resources/glossary' },
    '/contacto': { es: '/contacto', en: '/contact' },
    '/portal-pse': { es: '/portal-pse', en: '/payment-portal' },
    '/verificar/[code]': { es: '/verificar/[code]', en: '/verify/[code]' },
    '/lp/[campaign]': { es: '/lp/[campaign]', en: '/lp/[campaign]' }
  }
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
