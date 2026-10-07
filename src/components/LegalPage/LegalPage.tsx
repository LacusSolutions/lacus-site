'use client';

import { type ReactNode } from 'react';

import { Footer, Header } from '~/components';
import { LegalDocument, type LegalDocumentNamespace } from '~/components/LegalDocument';
import { SkipLink } from '~/components/SkipLink';
import { useHeaderHeight } from '~/hooks';

export interface LegalPageProps {
  namespace: LegalDocumentNamespace;
}

export function LegalPage({ namespace }: LegalPageProps): ReactNode {
  const headerHeight = useHeaderHeight();

  return (
    <div className="min-h-screen">
      <SkipLink />
      <Header />
      <main id="main-content" style={{ paddingTop: `${headerHeight}px` }}>
        <LegalDocument namespace={namespace} />
      </main>
      <Footer />
    </div>
  );
}
