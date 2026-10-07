import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { type Locale } from '~/i18n/routing';

import { buildPageMetadata } from './buildPageMetadata';

export type LegalPageNamespace = 'privacy' | 'terms';

export async function buildLegalPageMetadata(
  locale: Locale,
  namespace: LegalPageNamespace,
  path: '/privacy' | '/terms',
): Promise<Metadata> {
  const metadataT = await getTranslations({ locale, namespace: `${namespace}.metadata` });
  const siteT = await getTranslations({ locale, namespace: 'metadata' });

  return buildPageMetadata({
    locale,
    path,
    translations: {
      title: metadataT('title'),
      description: metadataT('description'),
      keywords: metadataT('keywords'),
      siteName: siteT('site_name'),
      ogImageAlt: siteT('og_image_alt'),
      applicationName: siteT('application_name'),
      category: siteT('category'),
    },
  });
}
