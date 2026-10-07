'use client';

import { type ReactNode } from 'react';

import { About, Contact, Footer, Header, Hero, Projects, Services } from '~/components';
import { SkipLink } from '~/components/SkipLink';
import { useHeaderHeight } from '~/hooks';

export function Home(): ReactNode {
  const headerHeight = useHeaderHeight();

  return (
    <div className="min-h-screen">
      <SkipLink />
      <Header />
      <main id="main-content" style={{ paddingTop: `${headerHeight}px` }}>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
