import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionProps {
  children: ReactNode;
  tone?: 'white' | 'neutral' | 'navy' | 'blue';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
}

const tones = {
  white: 'bg-white text-[var(--text-primary)]',
  neutral: 'bg-[var(--neutral-50)] text-[var(--text-primary)]',
  navy: 'bg-[var(--brand-navy)] text-white',
  blue: 'bg-gradient-to-br from-[var(--brand-blue-deep)] to-[var(--brand-blue)] text-white'
};

const paddings = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20 lg:py-24',
  lg: 'py-20 md:py-28 lg:py-32',
  xl: 'py-24 md:py-32 lg:py-40'
};

export function Section({
  children,
  tone = 'white',
  padding = 'md',
  className,
  id,
  as: Tag = 'section'
}: SectionProps) {
  return (
    <Tag id={id} className={cn('relative overflow-hidden', tones[tone], paddings[padding], className)}>
      {children}
    </Tag>
  );
}
