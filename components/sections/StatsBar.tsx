import { getTranslations } from 'next-intl/server';
import { Container, Section, StatCard } from '@/components/ui';

export async function StatsBar() {
  const t = await getTranslations('stats');
  const stats = [
    { value: 8, suffix: '+', label: t('years') },
    { value: '24/7', label: t('support') },
    { value: 100, suffix: '%', label: t('coverage') }
  ];

  return (
    <Section tone="navy" padding="md">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((s, idx) => (
            <StatCard key={idx} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
