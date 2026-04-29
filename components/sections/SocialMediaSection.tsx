import { getLocale, getTranslations } from 'next-intl/server';
import { Linkedin, ArrowRight, Play } from 'lucide-react';
import { Container, Section, Heading } from '@/components/ui';
import { TikTokIcon } from '@/components/layout/SocialIcons';
import { getSocialData } from '@/lib/content/social';

export async function SocialMediaSection() {
  const t = await getTranslations('social');
  const locale = await getLocale();
  const data = getSocialData();
  const linkedin = data.networks.find((n) => n.id === 'linkedin');
  const tiktok = data.networks.find((n) => n.id === 'tiktok');

  return (
    <Section tone="neutral" padding="lg">
      <Container size="wide">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Heading level={2} size="xl">
            {t('title')}
          </Heading>
          <p className="mt-4 text-[var(--text-secondary)] text-lg-fluid">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* LinkedIn card */}
          <article className="bg-white rounded-2xl p-8 lg:p-10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 border-t-[3px] border-[#0A66C2]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center">
                <Linkedin className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg">
                  {t('linkedinTitle')}
                </h3>
                <p className="text-xs text-[var(--text-tertiary)]">{t('linkedinDesc')}</p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {data.featuredLinkedInPosts.slice(0, 2).map((post, i) => (
                <li
                  key={i}
                  className="pb-4 border-b border-[var(--border-subtle)] last:border-0 last:pb-0"
                >
                  <p className="font-semibold text-[var(--brand-navy)] mb-1">
                    {locale === 'en' ? post.titleEn : post.titleEs}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {locale === 'en' ? post.excerptEn : post.excerptEs}
                  </p>
                </li>
              ))}
            </ul>

            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0A66C2] font-semibold hover:gap-3 transition-all"
              >
                {t('linkedinFollow')}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </article>

          {/* TikTok card */}
          <article className="bg-white rounded-2xl p-8 lg:p-10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 border-t-[3px] border-black">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <TikTokIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[var(--brand-navy)] text-lg">
                  {t('tiktokTitle')}
                </h3>
                <p className="text-xs text-[var(--text-tertiary)]">{t('tiktokDesc')}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {data.featuredTikToks.map((video) => {
                const href =
                  video.url ?? `https://www.tiktok.com/@gbscolombia/video/${video.videoId}`;
                return (
                  <a
                    key={video.videoId}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={locale === 'en' ? video.titleEn : video.titleEs}
                    className="aspect-[9/16] rounded-lg bg-gradient-to-br from-[var(--brand-navy)] via-[var(--brand-blue-deep)] to-black relative overflow-hidden group cursor-pointer"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white/80 group-hover:text-white transition-all">
                      <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current" strokeWidth={0} />
                      </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="block text-white text-[10px] font-medium line-clamp-2 leading-tight">
                        {locale === 'en' ? video.titleEn : video.titleEs}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            {tiktok && (
              <a
                href={tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all"
              >
                {t('tiktokFollow')}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </article>
        </div>
      </Container>
    </Section>
  );
}
