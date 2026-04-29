import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-tertiary)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--brand-blue)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={last ? 'text-[var(--text-primary)] font-medium' : ''}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
