import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Level = 1 | 2 | 3 | 4;
type Size = 'sm' | 'md' | 'lg' | 'xl' | 'display' | 'hero';

interface HeadingProps {
  children: ReactNode;
  level?: Level;
  size?: Size;
  className?: string;
  kicker?: string;
  balance?: boolean;
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xl-fluid',
  md: 'text-2xl-fluid',
  lg: 'text-3xl-fluid',
  xl: 'text-4xl-fluid',
  display: 'text-display',
  hero: 'text-hero'
};

export function Heading({
  children,
  level = 2,
  size = 'lg',
  className,
  kicker,
  balance = true
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <div className={cn('relative', className)}>
      {kicker && (
        <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[var(--brand-blue)] mb-4">
          {kicker}
        </p>
      )}
      <Tag
        className={cn(
          'font-heading font-bold leading-tight tracking-tight',
          sizeClasses[size],
          balance && 'text-balance'
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
