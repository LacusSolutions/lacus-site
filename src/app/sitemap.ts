import type { MetadataRoute } from 'next';

import { type Locale, routing } from '~/i18n/routing';
import { getCanonicalUrl, getLanguageAlternates } from '~/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = getLanguageAlternates();

  return routing.locales.map((locale) => ({
    url: getCanonicalUrl(locale as Locale),
    lastModified,
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages,
    },
  }));
}
