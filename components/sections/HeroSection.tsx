'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Container } from '@/components/ui';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

const SLIDES = [
  { src: '/images/hero/Banda-papa.jpeg', alt: 'Procesamiento de alimentos' },
  { src: '/images/hero/logistica.jpeg', alt: 'Logística industrial' },
  { src: '/images/hero/Port Coal.jpeg', alt: 'Puertos y carga' }
];
const SLIDE_MS = 5000;

export function HeroSection() {
  const t = useTranslations('hero');
  const tWa = useTranslations('whatsappFloat');
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (delta: number) =>
    setIdx((i) => (i + delta + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[var(--brand-navy)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={SLIDES[idx].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[idx].src}
              alt={SLIDES[idx].alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Lighter overlay so images breathe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10,37,64,0.55) 0%, rgba(10,37,64,0.3) 55%, rgba(30,95,158,0.35) 100%)'
          }}
        />
      </div>

      <Container size="wide" className="relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-6"
          >
            {t('kicker')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="font-heading font-bold text-white text-hero leading-[1.05] text-balance drop-shadow-[0_2px_18px_rgba(10,37,64,0.45)]"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 md:mt-8 text-white/95 text-lg-fluid max-w-2xl leading-relaxed drop-shadow"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button
              href="/diagnostico"
              variant="primary"
              size="lg"
              icon={<Activity className="w-5 h-5" />}
              iconPosition="left"
            >
              {t('ctaPrimary')}
            </Button>
            <Button
              href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
              variant="whiteOutline"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
              iconPosition="left"
              target="_blank"
            >
              {t('ctaSecondary')}
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Carousel controls */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white items-center justify-center transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Siguiente slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white items-center justify-center transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">{t('scrollHint')}</span>
        <ChevronDown className="w-4 h-4 animate-bounce-soft" />
      </motion.div>
    </section>
  );
}
