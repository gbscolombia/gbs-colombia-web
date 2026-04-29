import data from '@/content/case-studies/case-studies.json';

export interface CaseStoryLocale {
  problem: string;
  solution: string;
  result: string;
}

export interface CaseMetric {
  label: { es: string; en: string };
  value: string;
}

export interface CaseStudy {
  slug: string;
  titleEs: string;
  titleEn: string;
  clientName: string;
  industryEs?: string;
  industryEn?: string;
  /** kept for backward compat */
  industry?: string;
  categoryEs?: string;
  categoryEn?: string;
  year: string;
  location: string;
  summaryEs: string;
  summaryEn: string;
  bodyEs: string;
  bodyEn: string;
  heroImage: string;
  gallery?: string[];
  createdAt?: string;
  story?: { es: CaseStoryLocale; en: CaseStoryLocale };
  metrics?: CaseMetric[];
  testimonial?: { es: string; en: string };
  testimonialAuthor?: { es: string; en: string };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return (data as { cases: CaseStudy[] }).cases;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const cases = await getCaseStudies();
  return cases.find((c) => c.slug === slug) || null;
}
