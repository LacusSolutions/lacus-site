'use client';

import { type ReactNode } from 'react';

import { About, Contact, Footer, Header, Hero, Projects, Services } from '~/components';
import { SkipLink } from '~/components/SkipLink';

export function Home(): ReactNode {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <Header />
      <main id="main-content">
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
