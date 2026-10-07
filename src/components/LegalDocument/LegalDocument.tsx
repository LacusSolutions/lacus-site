'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

import { Link } from '~/i18n/navigation';

import styles from './LegalDocument.module.scss';

export type LegalDocumentNamespace = 'privacy' | 'terms';

interface LegalSection {
  body: string[];
  title: string;
}

export interface LegalDocumentProps {
  namespace: LegalDocumentNamespace;
}

export function LegalDocument({ namespace }: LegalDocumentProps): ReactNode {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as LegalSection[];

  return (
    <article className={styles.root}>
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <header className={styles.header}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.intro}>{t('intro')}</p>
            <p className={styles.updated}>
              {t('last_updated_label')}: {t('last_updated_date')}
            </p>
          </header>

          <div className={styles.sections}>
            {sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.body.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className={styles.back}>
            <Link href="/" className={styles.backLink}>
              {t('back_link')}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
