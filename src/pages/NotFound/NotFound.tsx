import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// SEO: Prevent indexing of 404 page
if (typeof document !== 'undefined') {
  const metaRobots = document.querySelector('meta[name="robots"]');
  if (metaRobots) {
    metaRobots.setAttribute('content', 'noindex,nofollow');
  } else {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
  }
}

export function NotFound(): ReactNode {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}
