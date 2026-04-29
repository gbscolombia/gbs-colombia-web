'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Activity, MessageCircle } from 'lucide-react';
import { Button, Container, Section } from '@/components/ui';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export function FinalCTA() {
  const t = useTranslations('finalCTA');
  const tWa = useTranslations('whatsappFloat');

  return (
    <Section tone="navy" padding="xl">
      <Container size="content">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-white text-display leading-tight text-balance"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 text-white/85 text-lg-fluid leading-relaxed"
          >
            {t('description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              href="/diagnostico"
              variant="primary"
              size="xl"
              icon={<Activity className="w-5 h-5" />}
              iconPosition="left"
            >
              {t('ctaPrimary')}
            </Button>
            <Button
              href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
              variant="whiteOutline"
              size="xl"
              icon={<MessageCircle className="w-5 h-5" />}
              iconPosition="left"
              target="_blank"
            >
              {t('ctaSecondary')}
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
