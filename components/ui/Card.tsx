import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tone?: 'white' | 'neutral' | 'navy' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
}

const tones = {
  white: 'bg-white shadow-[var(--shadow-sm)]',
  neutral: 'bg-[var(--neutral-50)]',
  navy: 'bg-[var(--brand-navy)] text-white',
  outline: 'bg-white border border-[var(--border-subtle)]'
};

const paddings = {
  none: '',
  sm: 'p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10'
};

export function Card({
  children,
  className,
  hover = false,
  tone = 'white',
  padding = 'md',
  as: Tag = 'div'
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-xl transition-all duration-300 ease-[var(--ease-out)]',
        tones[tone],
        paddings[padding],
        hover && 'hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]',
        className
      )}
    >
      {children}
    </Tag>
  );
}
