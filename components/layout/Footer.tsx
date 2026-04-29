import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Container } from '@/components/ui';
import { SocialIcons } from './SocialIcons';
import { site } from '@/lib/constants/site';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tWa = useTranslations('whatsappFloat');

  return (
    <footer className="bg-[var(--neutral-900)] text-[var(--neutral-300)]">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Company */}
          <div>
            <Link href="/" className="inline-block">
              <div className="bg-white rounded-lg p-3 inline-block">
                <Image
                  src="/logos/gbs-logo.png"
                  alt="GBS Colombia"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 text-sm font-medium text-white">{tCommon('tagline')}</p>
            <p className="mt-3 text-sm flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--brand-cyan)]" />
              {t('address')}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-white/50">
              {tCommon('memberOf')}
            </p>
          </div>

          {/* Col 2 — Solutions */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('solutionsTitle')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/catalogo/bandas-pesadas">{tNav('heavyDuty')}</FooterLink>
              <FooterLink href="/catalogo/bandas-livianas">{tNav('lightDuty')}</FooterLink>
              <FooterLink href="/catalogo/componentes">{tNav('components')}</FooterLink>
              <FooterLink href="/catalogo/servicios">{tNav('services')}</FooterLink>
              <FooterLink href="/diagnostico">{tNav('diagnostic')}</FooterLink>
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('companyTitle')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/nosotros">{tNav('about')}</FooterLink>
              <FooterLink href="/ingenieria">{tNav('engineering')}</FooterLink>
              <FooterLink href="/industrias">{tNav('industries')}</FooterLink>
              <FooterLink href="/casos-de-exito">{tNav('cases')}</FooterLink>
              <FooterLink href="/recursos/glosario">{tNav('glossary')}</FooterLink>
              <FooterLink href="/portal-pse">{tNav('paymentPortal')}</FooterLink>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('contactTitle')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--brand-cyan)] transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 hover:text-[var(--brand-cyan)] transition"
                >
                  <Mail className="w-4 h-4" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center gap-2 hover:text-[var(--brand-cyan)] transition"
                >
                  <Phone className="w-4 h-4" />
                  {site.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <SocialIcons tone="light" size="sm" />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container size="wide" className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-white/60">{t('legal')}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li>
              <Link href="/portal-pse" className="hover:text-[var(--brand-cyan)] transition">
                {tNav('paymentPortal')}
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-[var(--brand-cyan)] transition">
                {t('sitemap')}
              </a>
            </li>
            <li>
              <a href="/robots.txt" className="hover:text-[var(--brand-cyan)] transition">
                robots.txt
              </a>
            </li>
            <li>
              <a href="/llms.txt" className="hover:text-[var(--brand-cyan)] transition">
                llms.txt
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children
}: {
  href: Parameters<typeof Link>[0]['href'];
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-[var(--brand-cyan)] transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
