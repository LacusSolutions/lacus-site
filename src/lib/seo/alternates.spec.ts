import { describe, expect, it } from 'vitest';

import {
  getCanonicalUrl,
  getLanguageAlternates,
  getOpenGraphAlternateLocale,
  getOpenGraphLocale,
  getSchemaLanguage,
} from './alternates';

describe('alternates', () => {
  it('builds canonical URLs with trailing slash', () => {
    expect(getCanonicalUrl('en')).toBe('https://www.lacus.solutions/en/');
    expect(getCanonicalUrl('pt')).toBe('https://www.lacus.solutions/pt/');
  });

  it('exposes hreflang language map', () => {
    expect(getLanguageAlternates()).toEqual({
      en: 'https://www.lacus.solutions/en/',
      'pt-BR': 'https://www.lacus.solutions/pt/',
      'x-default': 'https://www.lacus.solutions/en/',
    });
  });

  it('maps Open Graph locales', () => {
    expect(getOpenGraphLocale('en')).toBe('en_US');
    expect(getOpenGraphLocale('pt')).toBe('pt_BR');
    expect(getOpenGraphAlternateLocale('en')).toBe('pt_BR');
    expect(getOpenGraphAlternateLocale('pt')).toBe('en_US');
  });

  it('maps schema.org inLanguage codes', () => {
    expect(getSchemaLanguage('en')).toBe('en-US');
    expect(getSchemaLanguage('pt')).toBe('pt-BR');
  });
});
