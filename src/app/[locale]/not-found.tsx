import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import { NotFoundView } from './NotFoundView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');

  return {
    title: t('title'),
    description: t('message'),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: t('title'),
      description: t('message'),
    },
    twitter: {
      title: t('title'),
      description: t('message'),
    },
  };
}

export default function NotFound(): ReactNode {
  return <NotFoundView />;
}
