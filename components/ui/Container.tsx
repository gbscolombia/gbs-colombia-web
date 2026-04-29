import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: ReactNode;
  size?: 'prose' | 'content' | 'wide' | 'ultra' | 'full';
  className?: string;
}

export function Container({ children, size = 'content', className }: ContainerProps) {
  const sizes = {
    prose: 'max-w-prose',
    content: 'max-w-content',
    wide: 'max-w-wide',
    ultra: 'max-w-ultra',
    full: 'max-w-none'
  };
  return (
    <div className={cn('mx-auto w-full px-5 md:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
