import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getClients } from '@/lib/content/clients';
import { Container, Section } from '@/components/ui';

export async function ClientsBar() {
  const t = await getTranslations('clientsBar');
  const clients = await getClients();
  const tripled = [...clients, ...clients, ...clients];

  return (
    <Section tone="neutral" padding="md">
      <Container size="wide">
        <p className="text-center text-sm md:text-base font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-10">
          {t('title')}
        </p>

        {/* Infinite marquee with edge fade — visible on all viewports */}
        <div className="relative overflow-hidden marquee-fade">
          <div
            className="flex gap-12 lg:gap-16 items-center animate-scroll-x whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {tripled.map((c, idx) => (
              <div
                key={`${c.id}-${idx}`}
                className="flex items-center justify-center h-16 w-32 shrink-0"
              >
                <ClientLogo client={c} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ClientLogo({ client }: { client: Awaited<ReturnType<typeof getClients>>[number] }) {
  return (
    <Image
      src={client.fallback}
      alt={client.name}
      width={160}
      height={64}
      className="max-h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    />
  );
}
