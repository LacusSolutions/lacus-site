import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { type ReactNode } from 'react';

import { Home } from '~/components/Home';
import { JsonLd } from '~/components/JsonLd';
import { type Locale, routing } from '~/i18n/routing';
import { buildPageMetadata, getPageMetadataTranslations } from '~/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): { locale: Locale }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return buildPageMetadata({
    locale: locale as Locale,
    translations: getPageMetadataTranslations(t),
  });
}

export default async function LocaleHomePage({ params }: PageProps): Promise<ReactNode> {
  const { locale } = await params;
  setRequestLocale(locale);
  const metadataT = await getTranslations({ locale, namespace: 'metadata' });
  const servicesT = await getTranslations({ locale, namespace: 'services' });

  const services = [
    { name: servicesT('web_dev.title'), description: servicesT('web_dev.description') },
    { name: servicesT('mobile_dev.title'), description: servicesT('mobile_dev.description') },
    { name: servicesT('api_dev.title'), description: servicesT('api_dev.description') },
  ];

  return (
    <>
      <JsonLd
        locale={locale as Locale}
        title={metadataT('title')}
        description={metadataT('description')}
        tagline={metadataT('tagline')}
        services={services}
      />
      <Home />
    </>
  );
}
