import { Suspense, useEffect } from 'react';
import { useHeaderHeight } from '~/hooks';
import { About, Contact, Footer, Hero, Header, Projects, Services } from '~/components';

export function Home() {
  const headerHeight = useHeaderHeight();

  return (
    <div className="min-h-screen">
      <Header />
      <main style={{ paddingTop: `${headerHeight}px` }}>
        <Hero />
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Services />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
