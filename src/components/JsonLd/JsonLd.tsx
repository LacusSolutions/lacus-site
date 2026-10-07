import type { ReactNode } from 'react';

import { type Locale } from '~/i18n/routing';

import { buildJsonLdGraph, type JsonLdService } from './JsonLd.utils';

interface JsonLdProps {
  description: string;
  locale: Locale;
  services: JsonLdService[];
  tagline: string;
  title: string;
}

export function JsonLd({ locale, title, description, tagline, services }: JsonLdProps): ReactNode {
  const graph = buildJsonLdGraph({
    locale,
    title,
    description,
    tagline,
    services,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
