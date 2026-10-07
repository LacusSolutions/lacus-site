import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import { type Locale, routing } from '~/i18n/routing';
import { buildNotFoundMetadata } from '~/lib/seo';

import { NotFoundView } from './NotFoundView';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const safeLocale = routing.locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = await getTranslations('notFound');

  return buildNotFoundMetadata(safeLocale, t('title'), t('message'));
}

export default function NotFound(): ReactNode {
  return <NotFoundView />;
}
