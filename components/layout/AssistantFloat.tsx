'use client';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { analytics } from '@/components/analytics/events';

/**
 * Floating "AI Assistant" button.
 * - Sits above the WhatsApp float on the bottom-right.
 * - Pulses gently to draw attention.
 * - Hides on the Assistant page itself to avoid redundancy.
 */
export function AssistantFloat() {
  const t = useTranslations('assistant');
  const pathname = usePathname();

  if (pathname?.includes('/asistente-ia') || pathname?.includes('/ai-assistant')) {
    return null;
  }

  return (
    <Link
      href="/asistente-ia"
      aria-label={t('title')}
      onClick={() => analytics.assistantOpen('floating')}
      className="group fixed bottom-24 right-6 z-40 inline-flex items-center gap-0 md:gap-2 h-14 md:h-16 rounded-full bg-gradient-to-br from-[var(--brand-blue)] via-[var(--brand-blue-deep)] to-[var(--brand-navy)] text-white shadow-[0_10px_30px_rgba(30,127,196,0.45)] hover:shadow-[0_14px_40px_rgba(30,127,196,0.6)] hover:scale-105 transition-all duration-300 px-4 md:pl-5 md:pr-6"
    >
      {/* Pulsing halo */}
      <span className="absolute inset-0 rounded-full bg-[var(--brand-cyan)] opacity-0 group-hover:opacity-30 animate-ping" />

      <span className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/15 backdrop-blur-sm">
        <Sparkles className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
      </span>

      {/* Label collapses on mobile to keep the floor uncluttered */}
      <span className="hidden md:inline relative font-heading font-bold text-sm tracking-wide">
        Asistente IA
      </span>

      {/* "NUEVO" badge */}
      <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-cyan)] text-[var(--brand-navy)] shadow-md">
        Nuevo
      </span>
    </Link>
  );
}
