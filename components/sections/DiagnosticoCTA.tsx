'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Activity, Check, FileText } from 'lucide-react';
import { Button, Container, Section } from '@/components/ui';

export function DiagnosticoCTA() {
  const t = useTranslations('diagnosticCTA');

  return (
    <Section tone="blue" padding="lg">
      <Container size="wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/80 mb-5"
            >
              {t('kicker')}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-heading font-bold text-white text-3xl-fluid md:text-4xl-fluid leading-tight text-balance"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 text-white/90 text-lg-fluid leading-relaxed max-w-xl"
            >
              {t('description')}
            </motion.p>

            <ul className="mt-8 space-y-3 text-white/95">
              {[t('bullet1'), t('bullet2'), t('bullet3')].map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-base">{b}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10"
            >
              <Button
                href="/diagnostico"
                variant="white"
                size="xl"
                icon={<Activity className="w-5 h-5" />}
                iconPosition="left"
              >
                {t('cta')}
              </Button>
            </motion.div>
          </div>

          {/* Visual mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="animate-float">
              <div
                className="relative bg-white rounded-2xl shadow-2xl p-8 lg:p-10 text-[var(--text-primary)] rotate-1 hover:rotate-0 transition-transform duration-500"
                style={{ transformOrigin: 'center' }}
              >
                <div className="flex items-center gap-3 pb-5 border-b border-[var(--border-subtle)]">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-navy)] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Brief técnico</div>
                    <div className="font-heading font-bold text-[var(--brand-navy)]">GBS-BT-2026-XXXXXXXX</div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <MockRow label="Operación" value="Industria Pesada" />
                  <MockRow label="Material" value="Clínker" />
                  <MockRow label="Ancho banda" value="1200 mm" />
                  <MockRow label="Largo" value="45 m" />
                  <MockRow label="Velocidad" value="Media" />
                </div>
                <div className="mt-5 pt-5 border-t border-[var(--border-subtle)] flex items-center gap-2 text-[var(--brand-blue)] font-semibold text-sm">
                  <Check className="w-4 h-4" />
                  Norma CEMA Belt Book 7ma Ed.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

function MockRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--text-tertiary)]">{label}</span>
      <span className="font-semibold text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
