import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, Factory, Pickaxe, Utensils, Package, Anchor, FlaskConical, Building2, Truck, Boxes } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section, Heading } from '@/components/ui';
import { getIndustries } from '@/lib/content/industries';

const iconMap = {
  Factory,
  Pickaxe,
  Utensils,
  Package,
  Anchor,
  FlaskConical,
  Building2,
  Truck,
  Boxes
} as const;

export async function IndustriesGrid() {
  const t = await getTranslations('industriesGrid');
  const locale = await getLocale();
  const industries = await getIndustries();

  return (
    <Section tone="white" padding="lg">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Heading level={2} size="xl">
              {t('title')}
            </Heading>
            <p className="mt-4 text-[var(--text-secondary)] text-lg-fluid">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href="/industrias"
            className="inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold hover:gap-2.5 transition-all"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {industries.map((ind) => {
            const Icon = iconMap[ind.icon as keyof typeof iconMap] || Factory;
            const name = locale === 'en' ? ind.nameEn : ind.nameEs;
            const desc = locale === 'en' ? ind.shortDescEn : ind.shortDescEs;
            return (
              <Link
                // @ts-expect-error — dynamic industry pathname
                href={`/industrias/${ind.slug}`}
                key={ind.slug}
                className="group relative bg-[var(--neutral-50)] hover:bg-white rounded-2xl p-6 lg:p-7 border border-transparent hover:border-[var(--brand-blue)]/20 hover:shadow-[var(--shadow-md)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-navy)] text-white flex items-center justify-center mb-5 group-hover:bg-[var(--brand-blue)] transition-colors">
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
                  {name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {desc}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
