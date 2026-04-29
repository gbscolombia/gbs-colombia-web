import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import type { Product, ProductCategory } from '@/lib/content/products';

interface ProductCardProps {
  product: Product;
  category: ProductCategory;
  locale: string;
  viewLabel: string;
}

export function ProductCard({ product, category, locale, viewLabel }: ProductCardProps) {
  const name = locale === 'en' ? product.nameEn : product.nameEs;
  const desc = locale === 'en' ? product.shortDescEn : product.shortDescEs;

  return (
    <Link
      // @ts-expect-error — dynamic catalog pathname
      href={`/catalogo/${category}/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--brand-blue)]/30 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative bg-[var(--neutral-100)] overflow-hidden">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg mb-2">
          {name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
          {desc}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[var(--brand-blue)] font-semibold text-sm group-hover:gap-2.5 transition-all">
          {viewLabel}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
