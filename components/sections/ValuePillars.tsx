'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Settings2, MessageSquare, Globe2 } from 'lucide-react';
import { Container, Section, Heading } from '@/components/ui';

export function ValuePillars() {
  const t = useTranslations('valuePillars');

  const pillars = [
    { icon: Settings2, title: t('pillar1Title'), text: t('pillar1Text') },
    { icon: MessageSquare, title: t('pillar2Title'), text: t('pillar2Text') },
    { icon: Globe2, title: t('pillar3Title'), text: t('pillar3Text') }
  ];

  return (
    <Section tone="white" padding="lg">
      <Container size="wide">
        <div className="text-center mb-14">
          <Heading level={2} size="xl">
            {t('title')}
          </Heading>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group bg-white rounded-2xl p-8 lg:p-10 border-t-[3px] border-[var(--brand-blue)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center mb-6 group-hover:bg-[var(--brand-blue)] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading font-bold text-xl-fluid text-[var(--brand-navy)] mb-3">
                  {p.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {p.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
