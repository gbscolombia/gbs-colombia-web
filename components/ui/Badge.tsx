import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: ReactNode;
  tone?: 'blue' | 'navy' | 'neutral' | 'success' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const tones = {
  blue: 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue-deep)] border border-[var(--brand-blue)]/20',
  navy: 'bg-[var(--brand-navy)] text-white',
  neutral: 'bg-[var(--neutral-100)] text-[var(--neutral-700)] border border-[var(--neutral-200)]',
  success: 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20',
  outline: 'border border-[var(--border-default)] text-[var(--text-secondary)]'
};

const sizes = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-3 py-1.5'
};

export function Badge({ children, tone = 'blue', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full',
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
