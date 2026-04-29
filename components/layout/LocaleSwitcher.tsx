'use client';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';

interface Props {
  tone?: 'light' | 'dark';
}

export function LocaleSwitcher({ tone = 'dark' }: Props) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next: Locale = locale === 'es' ? 'en' : 'es';
    startTransition(() => {
      // @ts-expect-error – dynamic pathname is valid across our defined routes
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-label="Change language"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
        tone === 'dark'
          ? 'text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]'
          : 'text-white hover:bg-white/10'
      )}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{locale === 'es' ? 'EN' : 'ES'}</span>
    </button>
  );
}
