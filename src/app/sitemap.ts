import type { MetadataRoute } from 'next';

import { type Locale, routing } from '~/i18n/routing';
import { getCanonicalUrl, getLanguageAlternates } from '~/lib/seo';

const SITEMAP_PATHS = ['/', '/privacy', '/terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = getLanguageAlternates();

  return routing.locales.flatMap((locale) =>
    SITEMAP_PATHS.map((path) => ({
      url: getCanonicalUrl(locale as Locale, path),
      lastModified,
      changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : 0.5,
      alternates: {
        languages,
      },
    })),
  );
}
