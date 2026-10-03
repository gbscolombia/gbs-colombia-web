import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail } from 'lucide-react';
import { Container, Section, Heading, Card } from '@/components/ui';
import { site } from '@/lib/constants/site';
import { pageAlternates } from '@/lib/seo/alternates';
import { getPrivacyContent, privacyUpdated } from '@/lib/content/privacy';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return {
    title: t('privacyTitle'),
    description: t('privacyDescription'),
    alternates: pageAlternates(locale, '/politica-de-privacidad')
  };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getPrivacyContent(locale);
  const updated = locale === 'en' ? privacyUpdated.en : privacyUpdated.es;

  return (
    <>
      <Section tone="navy" padding="lg">
        <Container size="content">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-5">
            {c.kicker}
          </p>
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance max-w-3xl">
            {c.title}
          </h1>
          <p className="mt-6 text-white/85 text-lg-fluid max-w-3xl leading-relaxed">{c.intro}</p>
          <p className="mt-6 text-sm text-white/70">
            {c.updatedLabel}: {updated}
          </p>
        </Container>
      </Section>

      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[16rem_1fr] gap-10 lg:gap-14">
            <aside className="lg:sticky lg:top-28 self-start">
              <Card tone="outline" padding="md">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--brand-blue)] mb-3">
                  {c.tocTitle}
                </p>
                <nav aria-label={c.tocTitle}>
                  <ul className="space-y-2 text-sm">
                    {c.sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Card>
            </aside>

            <article className="max-w-3xl">
              {c.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 mb-12 last:mb-0">
                  <Heading level={2} size="md">
                    {s.title}
                  </Heading>
                  {s.paragraphs?.map((p, i) => (
                    <p key={i} className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {s.items && (
                    <ul className="mt-4 space-y-2.5">
                      {s.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
                          <span
                            aria-hidden
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-blue)]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>
          </div>
        </Container>
      </Section>

      <Section tone="neutral" padding="sm">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[var(--text-secondary)]">
              {locale === 'en'
                ? 'Questions about your personal data? Write to us.'
                : '¿Dudas sobre tus datos personales? Escríbenos.'}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-deep)] transition"
            >
              <Mail className="w-4 h-4" />
              {site.email}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
