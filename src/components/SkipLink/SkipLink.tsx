'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

import styles from './SkipLink.module.scss';

export function SkipLink(): ReactNode {
  const t = useTranslations('a11y');

  return (
    <a href="#main-content" className={styles.skipLink}>
      {t('skip_to_main')}
    </a>
  );
}
