import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

function hasLocale(
  locales: readonly Locale[],
  candidate: string | undefined
): candidate is Locale {
  return !!candidate && (locales as readonly string[]).includes(candidate);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
