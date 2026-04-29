'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface NumberDisplayProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label?: string;
  className?: string;
  duration?: number;
  as?: 'span' | 'div' | 'p';
}

export function NumberDisplay({
  value,
  suffix = '',
  prefix = '',
  label,
  className,
  duration = 1200
}: NumberDisplayProps) {
  const isNumeric = typeof value === 'number';
  const [current, setCurrent] = useState<number>(isNumeric ? 0 : 0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !isNumeric) return;
    const start = performance.now();
    const target = value as number;
    let raf = 0;
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(animate);
      else setCurrent(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration, isNumeric]);

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      <div className="text-display font-heading font-bold leading-none text-[var(--brand-cyan)]">
        {prefix}
        {isNumeric ? current : value}
        {suffix}
      </div>
      {label && (
        <div className="text-sm text-white/70 uppercase tracking-wider font-medium">{label}</div>
      )}
    </div>
  );
}
