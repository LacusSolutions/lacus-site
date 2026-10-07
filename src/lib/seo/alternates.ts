import { type Locale } from '~/i18n/routing';
import { SITE_URL } from '~/lib/site';

export function getCanonicalUrl(locale: Locale, path = '/'): string {
  const normalized =
    path === '/' || path === ''
      ? `/${locale}/`
      : `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  const withTrailingSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${SITE_URL}${withTrailingSlash}`;
}

export function getLanguageAlternates(): Record<string, string> {
  return {
    en: `${SITE_URL}/en/`,
    'pt-BR': `${SITE_URL}/pt/`,
    'x-default': `${SITE_URL}/en/`,
  };
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === 'pt' ? 'pt_BR' : 'en_US';
}

export function getOpenGraphAlternateLocale(locale: Locale): string {
  return locale === 'pt' ? 'en_US' : 'pt_BR';
}

export function getSchemaLanguage(locale: Locale): string {
  return locale === 'pt' ? 'pt-BR' : 'en-US';
}
