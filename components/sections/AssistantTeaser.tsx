'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare, Zap } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container, Section } from '@/components/ui';
import { analytics } from '@/components/analytics/events';

/**
 * High-visibility teaser for the AI Assistant. Sits on the home page so the
 * tool is discoverable without forcing the user to dig into navigation.
 */
export function AssistantTeaser() {
  const t = useTranslations('assistant');

  const sampleQuestions = [
    '¿Qué banda recomiendan para clínker a 80°C?',
    '¿Cuánto dura un empalme vulcanizado en operación 24/7?',
    'Diferencia entre PU y PVC en grado alimenticio',
    '¿Qué es el ángulo de sobrecarga CEMA?'
  ];

  return (
    <Section tone="white" padding="lg">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-navy)] via-[var(--brand-blue-deep)] to-[var(--brand-navy)] p-8 md:p-12 lg:p-16">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--brand-cyan)] opacity-20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--brand-blue)] opacity-20 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-cyan)]/15 border border-[var(--brand-cyan)]/30 text-[var(--brand-cyan)] text-xs font-bold uppercase tracking-[0.2em] mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Nuevo · Powered by Claude
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="font-heading font-bold text-white text-3xl-fluid md:text-4xl-fluid leading-tight text-balance"
              >
                Resuelve dudas técnicas{' '}
                <span className="text-[var(--brand-cyan)]">en segundos</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-5 text-white/85 text-lg-fluid leading-relaxed max-w-xl"
              >
                Pregúntale lo que necesites sobre bandas transportadoras, materiales, normas CEMA o
                aplicaciones. Te responde un asistente entrenado con la experiencia técnica de GBS.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/asistente-ia"
                  onClick={() => analytics.assistantOpen('home-teaser')}
                  className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white text-[var(--brand-navy)] font-bold shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_40px_rgba(0,184,230,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-[var(--brand-blue)]" />
                  Abrir Asistente IA
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="inline-flex items-center gap-2 text-white/70 text-sm">
                  <Zap className="w-4 h-4 text-[var(--brand-cyan)]" />
                  Respuesta en menos de 5 segundos
                </div>
              </motion.div>
            </div>

            {/* Right: chat preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative"
            >
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 md:p-6">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)]" />
                  <span className="text-xs uppercase tracking-wider text-white/60">
                    En línea
                  </span>
                  <Sparkles className="w-4 h-4 text-[var(--brand-cyan)] ml-auto" />
                </div>

                <ul className="mt-4 space-y-2.5">
                  {sampleQuestions.map((q, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-white/85 px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 mt-0.5 text-[var(--brand-cyan)] flex-shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-white/50 leading-relaxed">
                  {t('scopeNotice')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
