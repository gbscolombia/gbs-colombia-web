import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { site } from '@/lib/constants/site';
import { cn } from '@/lib/utils/cn';

// TikTok icon (not in lucide)
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05 6.33 6.33 0 0 0-5.58 9.44 6.33 6.33 0 0 0 10.86-4.43V8.18a8.16 8.16 0 0 0 4.77 1.52V6.25a4.85 4.85 0 0 1-.82-.06Z" />
    </svg>
  );
}

interface SocialIconsProps {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SocialIcons({ tone = 'light', size = 'md', className }: SocialIconsProps) {
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  const boxSizes = { sm: 'w-9 h-9', md: 'w-11 h-11', lg: 'w-12 h-12' };

  const toneClasses =
    tone === 'light'
      ? 'bg-white/10 text-white hover:bg-[var(--brand-blue)] hover:text-white'
      : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--brand-blue)] hover:text-white';

  const networks = [
    { href: site.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: site.tiktok, label: 'TikTok', Icon: TikTokIcon },
    { href: site.instagram, label: 'Instagram', Icon: Instagram },
    { href: site.facebook, label: 'Facebook', Icon: Facebook }
  ];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {networks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            'inline-flex items-center justify-center rounded-full transition-colors duration-200',
            boxSizes[size],
            toneClasses
          )}
        >
          <Icon className={iconSizes[size]} />
        </a>
      ))}
    </div>
  );
}
