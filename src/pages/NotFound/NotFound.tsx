import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';

const NOT_FOUND_TITLE = 'Page Not Found (404) - Lacus';
const NOT_FOUND_DESCRIPTION =
  'The page you are looking for does not exist or has been moved. Return to the Lacus home page.';

function setMeta(selector: string, attr: string, value: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) ?? [];
    if (name) {
      if (selector.includes('property=')) el.setAttribute('property', name);
      else el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function NotFound(): ReactNode {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);

    const previousTitle = document.title;
    document.title = NOT_FOUND_TITLE;

    const robots = document.head.querySelector('meta[name="robots"]');
    const previousRobots = robots?.getAttribute('content') ?? null;
    if (robots) robots.setAttribute('content', 'noindex,nofollow');
    else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex,nofollow';
      document.head.appendChild(meta);
    }

    setMeta('meta[name="description"]', 'content', NOT_FOUND_DESCRIPTION);
    setMeta('meta[property="og:title"]', 'content', NOT_FOUND_TITLE);
    setMeta('meta[property="og:description"]', 'content', NOT_FOUND_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', 'content', NOT_FOUND_TITLE);
    setMeta('meta[name="twitter:description"]', 'content', NOT_FOUND_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (robots && previousRobots !== null) robots.setAttribute('content', previousRobots);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}
