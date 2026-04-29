'use client';
import { usePathname } from 'next/navigation';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { site } from '@/lib/constants/site';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { analytics } from '@/components/analytics/events';

/**
 * Floating action stack — visible on every page except inside the diagnostic
 * and the assistant page itself. Composed of:
 *  1. AI Assistant (top, brand cyan) — surfaces the IA tool everywhere
 *  2. WhatsApp (bottom, classic green) — primary contact channel
 */
export function WhatsAppFloat() {
  const t = useTranslations('whatsappFloat');
  const tAi = useTranslations('assistant');
  const pathname = usePathname();

  const onDiagnostic = pathname?.includes('/diagnostico') || pathname?.includes('/diagnostic');
  const onAssistant = pathname?.includes('/asistente-ia') || pathname?.includes('/ai-assistant');

  if (onDiagnostic) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {!onAssistant && (
        <Link
          href="/asistente-ia"
          aria-label={tAi('title')}
          className="group relative inline-flex items-center justify-center gap-2 h-12 md:h-14 pl-4 pr-5 rounded-full bg-gradient-to-r from-[var(--brand-blue-deep)] to-[var(--brand-blue)] text-white font-semibold text-sm shadow-[var(--shadow-xl)] hover:shadow-[var(--glow-cta)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
            <Sparkles className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--brand-cyan)] ring-2 ring-[var(--brand-blue-deep)] animate-pulse" />
          </span>
          <span className="hidden sm:inline">{tAi('title')}</span>
          <span className="sm:hidden">IA</span>
          <span className="absolute -top-2 -left-2 px-2 py-0.5 rounded-full bg-[var(--brand-cyan)] text-[var(--brand-navy)] text-[9px] font-bold uppercase tracking-wider shadow-[var(--shadow-sm)]">
            Nuevo
          </span>
        </Link>
      )}

      <a
        href={buildWhatsappUrl(t('defaultMessage'), site.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('label')}
        onClick={() => analytics.whatsappClick('floating', 'general')}
        className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[var(--shadow-xl)] hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      </a>
    </div>
  );
}
