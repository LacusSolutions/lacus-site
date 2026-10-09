export type LanguageCode = 'en' | 'pt';

export const LANGUAGE_FLAG_SRC: Record<LanguageCode, string> = {
  en: '/flags/us.svg',
  pt: '/flags/br.svg',
};

export const LANGUAGE_OPTIONS: { code: LanguageCode; name: string }[] = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
];
