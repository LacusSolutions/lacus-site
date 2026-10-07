'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

import { Link } from '~/i18n/navigation';

export function NotFoundView(): ReactNode {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('heading')}</h1>
        <p className="text-xl text-muted-foreground mb-4">{t('message')}</p>
        <Link href="/" className="text-primary hover:underline">
          {t('link')}
        </Link>
      </div>
    </div>
  );
}
