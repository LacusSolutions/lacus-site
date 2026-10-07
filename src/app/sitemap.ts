import type { MetadataRoute } from 'next';

import { routing } from '~/i18n/routing';
import { SITE_URL } from '~/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: {
        en: `${SITE_URL}/en/`,
        'pt-BR': `${SITE_URL}/pt/`,
        'x-default': `${SITE_URL}/en/`,
      },
    },
  }));
}
