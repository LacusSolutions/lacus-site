import type { PageMetadataTranslations } from './buildPageMetadata';

type MetadataTranslator = (key: string) => string;

export function getPageMetadataTranslations(t: MetadataTranslator): PageMetadataTranslations {
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    siteName: t('site_name'),
    ogImageAlt: t('og_image_alt'),
    applicationName: t('application_name'),
    category: t('category'),
  };
}
