import { site } from '@/lib/constants/site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    legalName: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/images/gbs-logo.png`,
    foundingDate: String(site.founded),
    parentOrganization: {
      '@type': 'Organization',
      name: site.parentGroup,
      url: site.parentGroupUrl
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: site.phone,
        email: site.email,
        areaServed: 'CO',
        availableLanguage: ['Spanish', 'English']
      }
    ],
    sameAs: [site.linkedin, site.tiktok, site.instagram, site.facebook]
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}#localbusiness`,
    name: site.legalName,
    url: site.url,
    image: `${site.url}/images/gbs-logo.png`,
    telephone: site.phone,
    email: site.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      }
    ]
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  image: string;
  category: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: input.image,
    category: input.category,
    url: input.url,
    brand: {
      '@type': 'Brand',
      name: site.name
    },
    manufacturer: {
      '@type': 'Organization',
      name: site.legalName
    }
  };
}

export function serviceSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@type': 'Organization', name: site.legalName, url: site.url },
    areaServed: { '@type': 'Country', name: 'Colombia' }
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    image: input.image,
    url: input.url,
    datePublished: input.datePublished,
    author: { '@type': 'Organization', name: site.legalName, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      logo: { '@type': 'ImageObject', url: `${site.url}/images/gbs-logo.png` }
    }
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqPageSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer }
    }))
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    step: input.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text
    }))
  };
}
