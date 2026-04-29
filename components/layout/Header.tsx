'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, ChevronDown, Activity, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileNav } from './MobileNav';
import { site } from '@/lib/constants/site';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const t = useTranslations('nav');
  const tHdr = useTranslations('header');
  const tWa = useTranslations('whatsappFloat');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200',
          scrolled ? 'shadow-[var(--shadow-md)]' : 'shadow-none border-b border-[var(--border-subtle)]'
        )}
      >
        <div className="container-wide flex h-[88px] items-center justify-between gap-4">
          {/* Logo — visually prominent, height fits 88px header */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="GBS Colombia">
            <Image
              src="/logos/gbs-logo.png"
              alt="GBS Colombia"
              width={240}
              height={72}
              priority
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/nosotros">{t('about')}</NavLink>
            <NavLink href="/ingenieria">{t('engineering')}</NavLink>
            <Dropdown
              label={t('catalog')}
              items={[
                { href: '/catalogo/bandas-pesadas', label: t('heavyDuty') },
                { href: '/catalogo/bandas-livianas', label: t('lightDuty') },
                { href: '/catalogo/componentes', label: t('components') },
                { href: '/catalogo/servicios', label: t('services') }
              ]}
            />
            <NavLink href="/industrias">{t('industries')}</NavLink>
            <Dropdown
              label={t('resources')}
              items={[
                { href: '/casos-de-exito', label: t('cases') },
                { href: '/recursos/glosario', label: t('glossary') },
                { href: '/asistente-ia', label: t('assistant') }
              ]}
            />
            <NavLink href="/portal-pse">{t('paymentPortal')}</NavLink>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Button
              href="/diagnostico"
              variant="primary"
              size="md"
              icon={<Activity className="w-4 h-4" />}
              iconPosition="left"
              className="hidden md:inline-flex"
            >
              {tHdr('ctaDiagnostic')}
            </Button>
            <Button
              href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
              variant="outline"
              size="md"
              icon={<MessageCircle className="w-4 h-4" />}
              iconPosition="left"
              className="hidden xl:inline-flex"
              target="_blank"
            >
              {tHdr('ctaWhatsapp')}
            </Button>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t('openMenu')}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--neutral-100)]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: Parameters<typeof Link>[0]['href']; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-navy)] rounded-lg hover:bg-[var(--neutral-50)] transition"
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  items
}: {
  label: string;
  items: Array<{ href: Parameters<typeof Link>[0]['href']; label: string }>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-navy)] rounded-lg hover:bg-[var(--neutral-50)] transition"
      >
        {label}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 min-w-[240px]">
          <div className="bg-white rounded-xl shadow-[var(--shadow-lg)] border border-[var(--border-subtle)] py-2">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--neutral-50)] hover:text-[var(--brand-navy)] transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
