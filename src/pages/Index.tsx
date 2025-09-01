import { Suspense, lazy, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { useHeaderHeight } from '@/hooks/useHeaderHeight';

// Lazy load heavy components for better performance
const About = lazy(() => import('@/components/About'));
const Services = lazy(() => import('@/components/Services'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));

const Index = () => {
  const headerHeight = useHeaderHeight();

  // Prefetch components when network is fast and user is idle
  useEffect(() => {
    if ('connection' in navigator && (navigator as any).connection?.effectiveType === '4g') {
      const prefetchTimer = setTimeout(() => {
        import('@/components/About');
        import('@/components/Services');
        import('@/components/Projects');
        import('@/components/Contact');
      }, 2000);
      
      return () => clearTimeout(prefetchTimer);
    }
  }, []);

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
};

export default Index;
