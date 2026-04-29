'use client';
import { useEffect } from 'react';
import { X, Activity, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui';
import { site } from '@/lib/constants/site';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations('nav');
  const tWa = useTranslations('whatsappFloat');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const links: { href: Parameters<typeof Link>[0]['href']; label: string }[] = [
    { href: '/', label: t('home') },
    { href: '/nosotros', label: t('about') },
    { href: '/ingenieria', label: t('engineering') },
    { href: '/catalogo', label: t('catalog') },
    { href: '/catalogo/bandas-pesadas', label: t('heavyDuty') },
    { href: '/catalogo/bandas-livianas', label: t('lightDuty') },
    { href: '/catalogo/componentes', label: t('components') },
    { href: '/catalogo/servicios', label: t('services') },
    { href: '/industrias', label: t('industries') },
    { href: '/casos-de-exito', label: t('cases') },
    { href: '/recursos/glosario', label: t('glossary') },
    { href: '/asistente-ia', label: t('assistant') },
    { href: '/contacto', label: t('contact') },
    { href: '/portal-pse', label: t('paymentPortal') }
  ];

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 h-full w-[min(360px,100%)] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-heading font-bold text-[var(--brand-navy)]">Menú</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('closeMenu')}
            className="w-10 h-10 rounded-full hover:bg-[var(--neutral-100)] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-[var(--text-primary)] hover:bg-[var(--neutral-50)] transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-5 border-t flex flex-col gap-3">
          <Button
            href="/diagnostico"
            variant="primary"
            size="lg"
            icon={<Activity className="w-4 h-4" />}
            iconPosition="left"
            fullWidth
            onClick={onClose}
          >
            {t('diagnostic')}
          </Button>
          <Button
            href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
            variant="outline"
            size="lg"
            icon={<MessageCircle className="w-4 h-4" />}
            iconPosition="left"
            fullWidth
            target="_blank"
          >
            WhatsApp
          </Button>
        </div>
      </aside>
    </div>
  );
}
