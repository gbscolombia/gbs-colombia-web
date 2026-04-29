import { forwardRef } from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className, id, children, ...props },
  ref
) {
  const selectId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'w-full rounded-lg border bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/30 focus:border-[var(--brand-blue)]',
          error ? 'border-[var(--danger)]' : 'border-[var(--border-default)]',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
});
