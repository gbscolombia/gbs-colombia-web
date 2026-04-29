import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AlertTriangle, Wrench, TrendingUp, Quote, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section, Breadcrumbs, Card } from '@/components/ui';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/content/cases';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema } from '@/components/seo/schemas';
import { site } from '@/lib/constants/site';

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) return {};
  return {
    title: locale === 'en' ? c.titleEn : c.titleEs,
    description: locale === 'en' ? c.summaryEn : c.summaryEs,
    openGraph: {
      type: 'article',
      images: [c.heroImage]
    }
  };
}

export default async function CaseDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cases');
  const tStory = await getTranslations('caseStory');
  const c = await getCaseStudyBySlug(slug);
  if (!c) notFound();

  const en = locale === 'en';
  const title = en ? c.titleEn : c.titleEs;
  const summary = en ? c.summaryEn : c.summaryEs;
  const story = c.story?.[en ? 'en' : 'es'];
  const industry = en ? c.industryEn ?? c.industry : c.industryEs ?? c.industry;
  const category = en ? c.categoryEn : c.categoryEs;
  const testimonial = c.testimonial ? c.testimonial[en ? 'en' : 'es'] : null;
  const author = c.testimonialAuthor ? c.testimonialAuthor[en ? 'en' : 'es'] : null;

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: title,
          description: summary,
          image: c.heroImage.startsWith('http') ? c.heroImage : `${site.url}${c.heroImage}`,
          url: `${site.url}/casos-de-exito/${c.slug}`,
          datePublished: c.createdAt ?? new Date().toISOString()
        })}
      />

      <Section tone="neutral" padding="sm">
        <Container size="wide">
          <Breadcrumbs items={[{ label: t('title'), href: '/casos-de-exito' }, { label: title }]} />
        </Container>
      </Section>

      {/* Hero with image full-bleed */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[var(--brand-navy)]">
        <div className="absolute inset-0">
          {c.heroImage && (
            <Image
              src={c.heroImage}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,37,64,0.2) 0%, rgba(10,37,64,0.85) 80%)'
            }}
          />
        </div>
        <Container size="content" className="relative z-10 py-16 lg:py-24">
          {category && (
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-4">
              {category}
            </p>
          )}
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance">
            {title}
          </h1>
          <p className="mt-5 text-white/90 text-lg-fluid max-w-3xl leading-relaxed">{summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span><strong className="text-white">{t('clientLabel')}:</strong> {c.clientName}</span>
            {industry && <span><strong className="text-white">{t('industryLabel')}:</strong> {industry}</span>}
            {c.year && <span><strong className="text-white">{t('yearLabel')}:</strong> {c.year}</span>}
            <span><strong className="text-white">{t('locationLabel')}:</strong> {c.location}</span>
          </div>
        </Container>
      </section>

      {/* Storytelling */}
      {story && (
        <Section tone="white" padding="lg">
          <Container size="content">
            <div className="space-y-12">
              <StoryBlock
                icon={<AlertTriangle className="w-6 h-6" />}
                tone="danger"
                title={tStory('problem')}
                text={story.problem}
              />
              <StoryBlock
                icon={<Wrench className="w-6 h-6" />}
                tone="brand"
                title={tStory('solution')}
                text={story.solution}
              />
              <StoryBlock
                icon={<TrendingUp className="w-6 h-6" />}
                tone="success"
                title={tStory('result')}
                text={story.result}
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Metrics */}
      {c.metrics && c.metrics.length > 0 && (
        <Section tone="neutral" padding="lg">
          <Container size="wide">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="font-heading font-bold text-[var(--brand-navy)] text-3xl-fluid">
                {tStory('metrics')}
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {c.metrics.map((m, i) => (
                <Card key={i} tone="white" padding="lg" className="text-center">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">
                    {m.label[en ? 'en' : 'es']}
                  </div>
                  <div className="font-heading font-bold text-3xl-fluid text-[var(--brand-blue)]">
                    {m.value}
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonial */}
      {testimonial && (
        <Section tone="navy" padding="lg">
          <Container size="content">
            <div className="text-center max-w-3xl mx-auto">
              <Quote className="w-10 h-10 text-[var(--brand-cyan)] mx-auto mb-5" />
              <p className="text-white text-2xl-fluid font-heading leading-relaxed text-balance">
                &ldquo;{testimonial}&rdquo;
              </p>
              {author && <p className="mt-6 text-white/70 text-sm uppercase tracking-wider">{author}</p>}
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      {c.gallery && c.gallery.length > 0 && (
        <Section tone="white" padding="lg">
          <Container size="wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.gallery.map((g, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--neutral-100)]"
                >
                  <Image src={g} alt="" fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="neutral" padding="md">
        <Container size="content" className="text-center">
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-2 text-[var(--brand-blue)] font-semibold hover:gap-3 transition-all"
          >
            {tStory('moreCases')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Container>
      </Section>
    </>
  );
}

function StoryBlock({
  icon,
  title,
  text,
  tone
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: 'danger' | 'brand' | 'success';
}) {
  const tones = {
    danger: 'bg-[var(--danger)]/10 text-[var(--danger)]',
    brand: 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]',
    success: 'bg-[var(--success)]/10 text-[var(--success)]'
  };
  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-3">
          {title}
        </h3>
        <p className="text-[var(--text-secondary)] text-lg-fluid leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
