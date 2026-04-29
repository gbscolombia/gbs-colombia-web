'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Cog, Wrench, HardHat } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section, Heading } from '@/components/ui';

export function PortfolioGrid() {
  const t = useTranslations('portfolio');
  const tCatalog = useTranslations('catalog');

  const cards = [
    {
      icon: HardHat,
      title: t('card1Title'),
      desc: t('card1Desc'),
      href: '/catalogo/bandas-pesadas' as const,
      accent: 'from-[var(--brand-navy)] to-[var(--brand-blue)]'
    },
    {
      icon: Sparkles,
      title: t('card2Title'),
      desc: t('card2Desc'),
      href: '/catalogo/bandas-livianas' as const,
      accent: 'from-[var(--brand-blue)] to-[var(--brand-cyan)]'
    },
    {
      icon: Cog,
      title: t('card3Title'),
      desc: t('card3Desc'),
      href: '/ingenieria' as const,
      accent: 'from-[var(--brand-navy)] to-[var(--brand-steel)]'
    },
    {
      icon: Layers,
      title: t('card4Title'),
      desc: t('card4Desc'),
      href: '/catalogo/componentes' as const,
      accent: 'from-[var(--brand-blue-deep)] to-[var(--brand-blue)]'
    },
    {
      icon: Wrench,
      title: t('card5Title'),
      desc: t('card5Desc'),
      href: '/catalogo/servicios' as const,
      accent: 'from-[var(--brand-steel)] to-[var(--brand-navy)]'
    }
  ];

  return (
    <Section tone="neutral" padding="lg">
      <Container size="wide">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Heading level={2} size="xl">
            {t('title')}
          </Heading>
          <p className="mt-4 text-[var(--text-secondary)] text-lg-fluid">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const span = i < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.55 }}
                className={span}
              >
                <Link
                  href={c.href}
                  className="group block h-full bg-white rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-28 bg-gradient-to-br ${c.accent} flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white/90" strokeWidth={1.5} />
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="font-heading font-bold text-lg text-[var(--brand-navy)] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                      {c.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      {tCatalog('viewCategory')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
