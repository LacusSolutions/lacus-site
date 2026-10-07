'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

import { Button } from '~/components/ui';
import { Link } from '~/i18n/navigation';

import { useCookieConsent } from './CookieConsent.context';
import styles from './CookieConsent.module.scss';

export function CookieConsent(): ReactNode {
  const t = useTranslations('cookies');
  const { accept, reject, showBanner } = useCookieConsent();

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <p id="cookie-consent-title" className={styles.title}>
            {t('title')}
          </p>
          <p id="cookie-consent-description" className={styles.message}>
            {t('message')}{' '}
            <Link href="/privacy#cookies" className={styles.privacyLink}>
              {t('privacy_link')}
            </Link>
          </p>
        </div>
        <div className={styles.actions}>
          <Button type="button" variant="outline" size="sm" onClick={reject}>
            {t('reject')}
          </Button>
          <Button type="button" variant="default" size="sm" onClick={accept}>
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
