'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  CreditCard,
  ExternalLink,
  Banknote,
  ShieldCheck,
  QrCode,
  Smartphone,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { site } from '@/lib/constants/site';

type Tab = 'openpay' | 'qr' | 'breb';

export function PaymentTabs() {
  const t = useTranslations('paymentPortal');
  const [tab, setTab] = useState<Tab>('openpay');
  const [copied, setCopied] = useState(false);

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(site.breBKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore — clipboard may be blocked
    }
  };

  return (
    <div>
      {/* Tabs header */}
      <div
        role="tablist"
        aria-label="Métodos de pago"
        className="flex flex-wrap gap-2 mb-6 p-1.5 rounded-2xl bg-[var(--neutral-100)] border border-[var(--border-subtle)]"
      >
        <TabButton active={tab === 'openpay'} onClick={() => setTab('openpay')} icon={<CreditCard className="w-4 h-4" />}>
          {t('tabOpenpay')}
        </TabButton>
        <TabButton active={tab === 'qr'} onClick={() => setTab('qr')} icon={<QrCode className="w-4 h-4" />}>
          {t('tabBancolombia')}
        </TabButton>
        <TabButton active={tab === 'breb'} onClick={() => setTab('breb')} icon={<Smartphone className="w-4 h-4" />}>
          {t('tabBreB')}
        </TabButton>
      </div>

      {/* Panels */}
      <div role="tabpanel">
        {tab === 'openpay' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <MethodCard icon={<Banknote className="w-5 h-5" />} title={t('methodPSE')} sub="Débito directo desde cualquier banco colombiano" />
              <MethodCard icon={<CreditCard className="w-5 h-5" />} title={t('methodCard')} sub="Visa, Mastercard, AmEx, Diners" />
            </div>
            <div className="rounded-xl bg-[var(--neutral-50)] border border-[var(--border-subtle)] p-5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[var(--brand-blue)] flex-shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{t('instructions')}</p>
            </div>
            <div>
              <a
                href={site.openpayCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 w-full px-8 rounded-lg bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-deep)] text-white text-lg font-semibold shadow-[var(--shadow-md)] hover:shadow-[var(--glow-cta)] transition-all active:translate-y-[1px]"
              >
                <CreditCard className="w-5 h-5" />
                {t('payNow')}
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
              <p className="text-xs text-center text-[var(--text-tertiary)] mt-2">{t('openInNewTab')}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
              <span>PSE</span>
              <span aria-hidden>·</span>
              <span>Visa</span>
              <span aria-hidden>·</span>
              <span>Mastercard</span>
              <span aria-hidden>·</span>
              <span>AmEx</span>
              <span aria-hidden>·</span>
              <span>Diners</span>
            </div>
          </div>
        )}

        {tab === 'qr' && (
          <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-8 items-center">
            <div className="relative w-full max-w-[280px] mx-auto md:mx-0 aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-[var(--shadow-md)]">
              <Image
                src={site.bancolombiaQrImage}
                alt="QR Bancolombia · GBS Colombia SAS"
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-2">
                {t('qrTitle')}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                {t('qrSubtitle')}
              </p>
              <a
                href={site.bancolombiaQrImage}
                download="QR-Bancolombia-GBS-Colombia.png"
                className="inline-flex items-center gap-2 px-5 h-12 rounded-lg bg-[var(--brand-navy)] text-white font-semibold hover:bg-[var(--brand-blue-deep)] transition"
              >
                <Download className="w-4 h-4" />
                {t('qrSaveButton')}
              </a>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                <span className="font-bold text-[var(--brand-navy)]">Bre-B</span>
                <span aria-hidden>|</span>
                <span className="font-bold text-[var(--brand-navy)]">Bancolombia</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'breb' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00DC96] to-[#00B879] flex items-center justify-center text-white font-heading font-bold text-2xl shadow-[var(--shadow-md)] mx-auto md:mx-0">
                Bre-B
              </div>
              <div>
                <h3 className="font-heading font-bold text-[var(--brand-navy)] text-2xl-fluid mb-1">
                  {t('breBTitle')}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{t('breBSubtitle')}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-blue-deep)] text-white p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                {t('breBKey')}
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="font-heading font-bold text-3xl md:text-4xl tracking-wider tabular-nums">
                  {site.breBKey}
                </div>
                <button
                  type="button"
                  onClick={copyKey}
                  className="inline-flex items-center gap-2 px-5 h-12 rounded-lg bg-white text-[var(--brand-navy)] font-semibold hover:bg-[var(--neutral-100)] transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[var(--success)]" />
                      {t('breBCopied')}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t('breBCopy')}
                    </>
                  )}
                </button>
              </div>
              <p className="mt-4 text-xs text-white/70">
                Titular: <strong className="text-white">GBS Colombia SAS</strong>
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-subtle)] p-6">
              <h4 className="font-heading font-bold text-[var(--brand-navy)] mb-4">{t('breBHowTo')}</h4>
              <ol className="space-y-3 text-sm text-[var(--text-primary)]">
                <Step n={1}>{t('breBStep1')}</Step>
                <Step n={2}>{t('breBStep2')}</Step>
                <Step n={3}>{t('breBStep3')}</Step>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  icon
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-white text-[var(--brand-navy)] shadow-[var(--shadow-sm)]'
          : 'text-[var(--text-secondary)] hover:text-[var(--brand-navy)]'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function MethodCard({
  icon,
  title,
  sub
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] p-5 flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-heading font-bold text-[var(--brand-navy)]">{title}</div>
        <p className="text-xs text-[var(--text-tertiary)] mt-1">{sub}</p>
      </div>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--brand-blue)] text-white text-xs font-bold flex items-center justify-center">
        {n}
      </span>
      <span className="leading-relaxed pt-0.5">{children}</span>
    </li>
  );
}
