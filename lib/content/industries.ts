import data from '@/content/industries/industries.json';

export interface Industry {
  slug: string;
  nameEs: string;
  nameEn: string;
  icon: string;
  heroImage: string;
  shortDescEs: string;
  shortDescEn: string;
  fullDescEs: string;
  fullDescEn: string;
  recommendedProducts: string[];
  conditions: string[];
}

export async function getIndustries(): Promise<Industry[]> {
  return (data as { industries: Industry[] }).industries;
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const industries = await getIndustries();
  return industries.find((i) => i.slug === slug) || null;
}
