import { type Locale } from '~/i18n/routing';
import { getCanonicalUrl, getSchemaLanguage } from '~/lib/seo/alternates';
import { LOGO_PATH, SAME_AS, SITE_NAME } from '~/lib/seo/constants';
import { SITE_CONTACT, SITE_URL } from '~/lib/site';

export interface JsonLdService {
  description: string;
  name: string;
}

export interface BuildJsonLdGraphInput {
  description: string;
  locale: Locale;
  services: JsonLdService[];
  tagline: string;
  title: string;
}

export function buildJsonLdGraph({
  locale,
  title,
  description,
  tagline,
  services,
}: BuildJsonLdGraphInput): Record<string, unknown> {
  const canonical = getCanonicalUrl(locale);
  const inLanguage = getSchemaLanguage(locale);
  const websiteId = `${SITE_URL}/#website`;
  const organizationId = `${SITE_URL}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_NAME,
        description,
        url: SITE_URL,
        logo: `${SITE_URL}${LOGO_PATH}`,
        sameAs: SAME_AS,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: SITE_CONTACT.email,
          telephone: SITE_CONTACT.phoneTel,
          areaServed: ['BR', 'US'],
          availableLanguage: ['English', 'Portuguese'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_NAME,
        url: SITE_URL,
        description: tagline,
        inLanguage: ['en-US', 'pt-BR'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#professional-service`,
        name: SITE_NAME,
        description,
        url: SITE_URL,
        image: `${SITE_URL}${LOGO_PATH}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'São Paulo',
          addressRegion: 'SP',
          addressCountry: 'BR',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Brazil',
        },
        makesOffer: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: { '@id': organizationId },
          },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: title,
        description,
        inLanguage,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
    ],
  };
}
