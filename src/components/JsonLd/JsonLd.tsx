import type { ReactNode } from 'react';

const SITE_URL = 'https://www.lacus.solutions';

interface JsonLdProps {
  description: string;
}

export function JsonLd({ description }: JsonLdProps): ReactNode {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lacus',
    description,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lacus',
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
