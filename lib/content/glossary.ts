import data from '@/content/glossary/glossary.json';

export interface GlossaryTerm {
  slug: string;
  termEs: string;
  termEn: string;
  definitionEs: string;
  definitionEn: string;
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  const terms = (data as { terms: GlossaryTerm[] }).terms;
  return [...terms].sort((a, b) => a.termEs.localeCompare(b.termEs));
}

export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  const terms = await getGlossaryTerms();
  return terms.find((t) => t.slug === slug) || null;
}
