import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { AssistantFloat } from '@/components/layout/AssistantFloat';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics/GoogleTagManager';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, localBusinessSchema } from '@/components/seo/schemas';
import { site } from '@/lib/constants/site';
import '../globals.css';

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800']
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700']
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const tagline = locale === 'en' ? site.taglineEn : site.taglineEs;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} · ${t('homeTitle')}`,
      template: `%s · ${site.name}`
    },
    description: t('homeDescription'),
    applicationName: site.name,
    authors: [{ name: site.legalName }],
    keywords: [
      'bandas transportadoras',
      'CEMA',
      'conveyor belts',
      'Colombia',
      'industrial',
      'GBS International Group',
      'ingeniería',
      'transporte industrial'
    ],
    alternates: {
      canonical: '/',
      languages: {
        es: '/',
        en: '/en'
      }
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: `${site.name} · ${tagline}`,
      description: t('homeDescription'),
      locale: locale === 'en' ? 'en_US' : 'es_CO',
      url: site.url
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} · ${tagline}`,
      description: t('homeDescription')
    },
    icons: {
      icon: '/favicon.jpg',
      apple: '/apple-icon.png'
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white antialiased flex flex-col">
        <GoogleTagManager />
        <MetaPixel />
        <GoogleTagManagerNoScript />
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AssistantFloat />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
