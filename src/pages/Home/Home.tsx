import { type ReactNode, Suspense } from 'react';

import { About, Contact, Footer, Header, Hero, Projects, Services } from '~/components';
import { useHeaderHeight } from '~/hooks';

export function Home(): ReactNode {
  const headerHeight = useHeaderHeight();

  return (
    <div className="min-h-screen">
      <Header />
      <main style={{ paddingTop: `${headerHeight}px` }}>
        <Hero />
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <About />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Services />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Projects />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
