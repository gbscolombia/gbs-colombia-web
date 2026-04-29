'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Wrench, Layers, Settings } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section, Heading } from '@/components/ui';

export function EngineeringPhilosophy() {
  const t = useTranslations('philosophy');

  const diffs = [
    { icon: Shield, text: t('diff1') },
    { icon: Wrench, text: t('diff2') },
    { icon: Layers, text: t('diff3') },
    { icon: Settings, text: t('diff4') }
  ];

  return (
    <Section tone="navy" padding="lg">
      <Container size="wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Heading level={2} size="xl" kicker="CEMA BELT BOOK · 7MA ED.">
              <span className="text-white">{t('title')}</span>
            </Heading>
            <p className="mt-6 text-white/85 text-lg-fluid leading-relaxed max-w-xl">
              {t('description')}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/ingenieria"
                className="inline-flex items-center gap-2 text-[var(--brand-cyan)] font-semibold text-lg hover:gap-3 transition-all"
              >
                {t('cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {diffs.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[var(--brand-cyan)]/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <p className="text-white font-semibold leading-snug">{d.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
