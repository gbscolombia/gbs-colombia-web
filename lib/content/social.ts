import data from '@/content/settings/social.json';

export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: string;
  primary: boolean;
  showInHero: boolean;
  showInFooter: boolean;
}

export interface FeaturedTikTok {
  videoId: string;
  /** Optional canonical URL — falls back to https://www.tiktok.com/@<handle>/video/<videoId> */
  url?: string;
  titleEs: string;
  titleEn: string;
}

export interface FeaturedLinkedIn {
  url: string;
  titleEs: string;
  excerptEs: string;
  titleEn: string;
  excerptEn: string;
  date: string;
}

export interface SocialData {
  networks: SocialNetwork[];
  featuredTikToks: FeaturedTikTok[];
  featuredLinkedInPosts: FeaturedLinkedIn[];
}

export function getSocialData(): SocialData {
  return data as SocialData;
}
