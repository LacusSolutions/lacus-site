import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type ReactNode } from 'react';

import { LegalPage } from '~/components/LegalPage';
import { type Locale, routing } from '~/i18n/routing';
import { buildLegalPageMetadata } from '~/lib/seo/buildLegalPageMetadata';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): { locale: Locale }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLegalPageMetadata(locale as Locale, 'privacy', '/privacy');
}

export default async function PrivacyPage({ params }: PageProps): Promise<ReactNode> {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage namespace="privacy" />;
}
