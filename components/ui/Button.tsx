import Link from 'next/link';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'whiteOutline';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

interface AsButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: never;
}

interface AsLinkProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ButtonProps = AsButtonProps | AsLinkProps;

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-deep)] shadow-[var(--shadow-md)] hover:shadow-[var(--glow-cta)] active:translate-y-[1px]',
  secondary:
    'bg-[var(--brand-navy)] text-white hover:bg-[var(--brand-blue-deep)] shadow-[var(--shadow-md)]',
  outline:
    'border-2 border-[var(--brand-navy)] text-[var(--brand-navy)] hover:bg-[var(--brand-navy)] hover:text-white',
  ghost:
    'text-[var(--brand-navy)] hover:bg-[var(--neutral-100)]',
  white:
    'bg-white text-[var(--brand-navy)] hover:bg-[var(--neutral-100)] shadow-[var(--shadow-md)]',
  whiteOutline:
    'border-2 border-white text-white hover:bg-white hover:text-[var(--brand-navy)]'
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3 py-2 h-9',
  md: 'text-sm px-5 py-2.5 h-11',
  lg: 'text-base px-6 py-3 h-12',
  xl: 'text-lg px-8 py-4 h-14'
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth,
      children,
      className
    } = props;

    const classes = cn(
      base,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </>
    );

    if ('href' in props && props.href) {
      const { href, target, rel, onClick } = props;
      const external = href.startsWith('http') || target === '_blank';
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={external ? rel || 'noopener noreferrer' : rel}
          onClick={onClick}
          className={classes}
        >
          {content}
        </Link>
      );
    }

    // Strip BaseProps so they never reach the <button> DOM node.
    const {
      // BaseProps (already consumed for styling)
      variant: _v,
      size: _s,
      icon: _i,
      iconPosition: _ip,
      fullWidth: _fw,
      children: _c,
      className: _cl,
      // Pull out native button bits we want to pass through
      onClick,
      type = 'button',
      disabled,
      ...rest
    } = props as AsButtonProps & BaseProps;
    void _v; void _s; void _i; void _ip; void _fw; void _c; void _cl;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {content}
      </button>
    );
  }
);
