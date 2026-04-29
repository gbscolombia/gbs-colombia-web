import data from '@/content/settings/landings.json';

export interface LandingBullet {
  es: string;
  en: string;
}

export interface LandingCampaign {
  slug: string;
  titleEs: string;
  titleEn: string;
  kickerEs: string;
  kickerEn: string;
  subtitleEs: string;
  subtitleEn: string;
  heroImage: string;
  bullets: LandingBullet[];
}

export async function getLandings(): Promise<LandingCampaign[]> {
  return (data as { campaigns: LandingCampaign[] }).campaigns;
}

export async function getLandingBySlug(slug: string): Promise<LandingCampaign | null> {
  const campaigns = await getLandings();
  return campaigns.find((c) => c.slug === slug) || null;
}
