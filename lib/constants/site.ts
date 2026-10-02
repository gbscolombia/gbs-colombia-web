export const site = {
  name: 'GBS Colombia',
  legalName: 'GBS Colombia SAS',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gbscolombia.com',
  taglineEs: 'Ingeniería en Movimiento',
  taglineEn: 'Engineering in Motion',
  founded: 2016,
  city: 'Pereira',
  region: 'Risaralda',
  country: 'Colombia',
  countryCode: 'CO',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573011144826',
  phone: process.env.NEXT_PUBLIC_PHONE || '+57-301-114-4826',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@gbscolombia.com',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/gbs-group-int/',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@gbscolombia',
  tiktokHandle: process.env.NEXT_PUBLIC_TIKTOK_HANDLE || 'gbscolombia',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/gbscolom/',
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'gbscolom',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61577897436038',
  parentGroup: 'GBS International Group',
  parentGroupUrl: 'https://www.gbsint.com'
} as const;

export const yearsOperating = new Date().getFullYear() - site.founded;
