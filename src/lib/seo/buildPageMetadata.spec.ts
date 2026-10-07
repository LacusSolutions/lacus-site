import { describe, expect, it } from 'vitest';

import { buildPageMetadata } from './buildPageMetadata';

const translations = {
  title: 'Lacus - Custom Software Development',
  description: 'We transform ideas into innovative technology solutions.',
  keywords: 'software, lacus',
  siteName: 'Lacus',
  ogImageAlt: 'Lacus — custom software development',
  applicationName: 'Lacus',
  category: 'technology',
};

describe('buildPageMetadata', () => {
  it('returns canonical and hreflang for English home', () => {
    const metadata = buildPageMetadata({
      locale: 'en',
      translations,
    });

    expect(metadata.title).toEqual({ absolute: translations.title });
    expect(metadata.alternates?.canonical).toBe('https://www.lacus.solutions/en/');
    expect(metadata.alternates?.languages?.['pt-BR']).toBe('https://www.lacus.solutions/pt/');
    expect(metadata.openGraph?.locale).toBe('en_US');
    expect(metadata.openGraph?.alternateLocale).toEqual(['pt_BR']);
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it('sets noindex for not-found style metadata', () => {
    const metadata = buildPageMetadata({
      locale: 'pt',
      translations,
      index: false,
      follow: false,
      includeOgImage: false,
    });

    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });
});
