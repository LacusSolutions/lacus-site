import type { Metadata } from 'next';

import { type Locale } from '~/i18n/routing';
import { SITE_URL } from '~/lib/site';

import {
  getCanonicalUrl,
  getLanguageAlternates,
  getOpenGraphAlternateLocale,
  getOpenGraphLocale,
} from './alternates';
import {
  getOgImageUrl,
  LOGO_PATH,
  MANIFEST_PATH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_TYPE,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  THEME_COLOR,
} from './constants';

export interface PageMetadataTranslations {
  applicationName: string;
  category: string;
  description: string;
  keywords: string;
  ogImageAlt: string;
  siteName: string;
  title: string;
}

export interface BuildPageMetadataOptions {
  follow?: boolean;
  includeOgImage?: boolean;
  index?: boolean;
  locale: Locale;
  path?: string;
  translations: PageMetadataTranslations;
}

function getVerification(): Metadata['verification'] {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  if (!google) {
    return undefined;
  }
  return { google };
}

export const defaultSiteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  manifest: MANIFEST_PATH,
};

export function buildPageMetadata({
  locale,
  path = '/',
  translations,
  index = true,
  follow = true,
  includeOgImage = true,
}: BuildPageMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const languages = getLanguageAlternates();
  const ogLocale = getOpenGraphLocale(locale);
  const ogImageUrl = getOgImageUrl();

  const robots: Metadata['robots'] = {
    index,
    follow,
    googleBot: {
      index,
      follow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };

  const openGraphImages = includeOgImage
    ? [
        {
          url: OG_IMAGE_PATH,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: translations.ogImageAlt,
          type: OG_IMAGE_TYPE,
        },
      ]
    : undefined;

  const twitterImages = includeOgImage ? [ogImageUrl] : undefined;

  return {
    title: {
      absolute: translations.title,
    },
    description: translations.description,
    keywords: translations.keywords,
    applicationName: translations.applicationName,
    category: translations.category,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: translations.siteName,
      locale: ogLocale,
      alternateLocale: [getOpenGraphAlternateLocale(locale)],
      title: translations.title,
      description: translations.description,
      images: openGraphImages,
    },
    twitter: {
      card: includeOgImage ? 'summary_large_image' : 'summary',
      title: translations.title,
      description: translations.description,
      images: twitterImages,
    },
    icons: {
      icon: LOGO_PATH,
      apple: LOGO_PATH,
    },
    verification: getVerification(),
    other: {
      'theme-color': THEME_COLOR,
    },
  };
}

export function buildNotFoundMetadata(
  locale: Locale,
  title: string,
  description: string,
): Metadata {
  return buildPageMetadata({
    locale,
    path: '/',
    translations: {
      title,
      description,
      keywords: '',
      siteName: SITE_NAME,
      ogImageAlt: '',
      applicationName: SITE_NAME,
      category: 'technology',
    },
    index: false,
    follow: false,
    includeOgImage: false,
  });
}
