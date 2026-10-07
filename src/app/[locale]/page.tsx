import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { type ReactNode } from 'react';

import { Home } from '~/components/Home';
import { JsonLd } from '~/components/JsonLd';
import { type Locale, routing } from '~/i18n/routing';
import { SITE_URL } from '~/lib/site';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): { locale: Locale }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const languages: Record<string, string> = {
    en: `${SITE_URL}/en/`,
    'pt-BR': `${SITE_URL}/pt/`,
    'x-default': `${SITE_URL}/en/`,
  };

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/`,
      siteName: 'Lacus',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      title: t('title'),
      description: t('description'),
      images: [{ url: `${SITE_URL}/og/og-image.png` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${SITE_URL}/og/og-image.png`],
    },
  };
}

export default async function LocaleHomePage({ params }: PageProps): Promise<ReactNode> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return (
    <>
      <JsonLd description={t('description')} />
      <Home />
    </>
  );
}
