import { NumberDisplay } from './NumberDisplay';

interface StatCardProps {
  value: number | string;
  suffix?: string;
  label: string;
}

export function StatCard({ value, suffix, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-start gap-3 p-6 lg:p-8 border-l border-white/10 first:border-l-0 lg:pl-12 first:lg:pl-0">
      <NumberDisplay value={value} suffix={suffix} label={label} />
    </div>
  );
}
