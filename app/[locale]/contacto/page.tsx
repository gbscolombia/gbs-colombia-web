import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  Globe2,
  ArrowRight,
  Activity,
  ExternalLink
} from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Button, Container, Section, Card } from '@/components/ui';
import { SocialIcons } from '@/components/layout/SocialIcons';
import { ContactForm } from '@/components/contact/ContactForm';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';
import { site } from '@/lib/constants/site';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  return { title: t('contactTitle'), description: t('contactDescription') };
}

const MAP_QUERY = 'GBS Colombia SAS, Pereira, Risaralda, Colombia';

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tWa = await getTranslations('whatsappFloat');

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
  const mapHref = `https://www.google.com/maps/search/${encodeURIComponent(MAP_QUERY)}`;

  return (
    <>
      {/* Hero */}
      <Section tone="navy" padding="lg">
        <Container size="content">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[var(--brand-cyan)] mb-5">
            {t('kicker')}
          </p>
          <h1 className="font-heading font-bold text-white text-display leading-tight text-balance max-w-3xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-white/85 text-lg-fluid max-w-3xl leading-relaxed">
            {t('heroDescription')}
          </p>
        </Container>
      </Section>

      {/* Quick contact cards */}
      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card tone="white" padding="lg" className="border-t-[3px] border-[#25D366]">
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-1">
                {t('whatsappLabel')}
              </h3>
              <p className="text-[var(--text-secondary)] mb-5 text-sm">{site.phone}</p>
              <Button
                href={buildWhatsappUrl(tWa('defaultMessage'), site.whatsapp)}
                variant="primary"
                size="md"
                target="_blank"
                icon={<MessageCircle className="w-4 h-4" />}
                iconPosition="left"
              >
                {t('whatsappCta')}
              </Button>
            </Card>

            <Card tone="white" padding="lg" className="border-t-[3px] border-[var(--brand-blue)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue)] text-white flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-1">
                {t('emailLabel')}
              </h3>
              <a
                href={`mailto:${site.email}`}
                className="text-[var(--brand-blue)] hover:underline font-medium block mb-5"
              >
                {site.email}
              </a>
              <Button
                href={`mailto:${site.email}`}
                variant="outline"
                size="md"
                icon={<Mail className="w-4 h-4" />}
                iconPosition="left"
              >
                {t('emailCta')}
              </Button>
            </Card>

            <Card tone="white" padding="lg" className="border-t-[3px] border-[var(--brand-navy)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-navy)] text-white flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-1">
                {t('phoneLabel')}
              </h3>
              <a
                href={`tel:${site.phone}`}
                className="text-[var(--brand-blue)] hover:underline font-medium block mb-5"
              >
                {site.phone}
              </a>
              <Button
                href={`tel:${site.phone}`}
                variant="outline"
                size="md"
                icon={<Phone className="w-4 h-4" />}
                iconPosition="left"
              >
                {t('phoneCta')}
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Map + Address + Hours */}
      <Section tone="neutral" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-[var(--shadow-sm)]">
              <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <h3 className="font-heading font-bold text-[var(--brand-navy)]">{t('mapTitle')}</h3>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)] hover:gap-2 transition-all"
                >
                  {t('mapCta')}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="aspect-[16/10] w-full bg-[var(--neutral-100)]">
                <iframe
                  title={t('mapTitle')}
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Card tone="white" padding="md">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--brand-blue)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-[var(--brand-navy)] mb-1">
                      {t('addressLabel')}
                    </h4>
                    <p className="text-[var(--text-secondary)]">{t('addressFull')}</p>
                  </div>
                </div>
              </Card>

              <Card tone="white" padding="md">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--brand-blue)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-[var(--brand-navy)] mb-1">
                      {t('hoursLabel')}
                    </h4>
                    <p className="text-[var(--text-secondary)]">{t('hoursValue')}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">{t('hoursTimezone')}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 font-medium">
                      {t('responseTime')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card tone="white" padding="md">
                <div className="flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-[var(--brand-blue)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-[var(--brand-navy)] mb-1">
                      {t('coverageLabel')}
                    </h4>
                    <p className="text-[var(--text-secondary)]">{t('coverageValue')}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form + Legal info */}
      <Section tone="white" padding="lg">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1.4fr,1fr] gap-10 items-start">
            <Card tone="white" padding="lg" className="border border-[var(--border-subtle)]">
              <h2 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-2">
                {t('formTitle')}
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">{t('formDescription')}</p>
              <ContactForm />
            </Card>

            <div className="space-y-6">
              <Card tone="neutral" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-5 h-5 text-[var(--brand-blue)]" />
                  <h4 className="font-heading font-bold text-[var(--brand-navy)]">
                    {t('legalLabel')}
                  </h4>
                </div>
                <dl className="space-y-3 text-sm">
                  <Row label={t('legalName')} value={site.legalName} />
                  <Row label={t('nitLabel')} value={t('nitValue')} />
                  <Row label={t('groupLabel')} value={t('groupValue')} />
                </dl>
              </Card>

              <Card tone="navy" padding="lg" className="text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--brand-cyan)] mb-3">
                  GBS · Diagnóstico
                </div>
                <h4 className="font-heading font-bold text-xl mb-2">{t('diagnosticBlockTitle')}</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  {t('diagnosticBlockText')}
                </p>
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-lg bg-white text-[var(--brand-navy)] font-semibold text-sm hover:bg-[var(--neutral-100)] transition"
                >
                  <Activity className="w-4 h-4" />
                  {t('diagnosticBlockCta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>

              <Card tone="white" padding="lg" className="border border-[var(--border-subtle)]">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3 font-semibold">
                  {t('social')}
                </div>
                <SocialIcons tone="dark" size="md" />
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-[var(--text-tertiary)]">{label}</dt>
      <dd className="font-semibold text-[var(--text-primary)] text-right">{value}</dd>
    </div>
  );
}
