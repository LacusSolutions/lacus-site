import { useEffect, useRef, useState } from 'react';

import {
  resolveHeaderCompactOnScroll,
  shouldSnapScrollToTopOnExpand,
} from './useScrollPosition.utils';

export function useScrollPosition(threshold = 100, snapToTopOnExpand = false): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const lastScrollTopRef = useRef(0);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (isSnappingRef.current) {
        return;
      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const lastScrollTop = lastScrollTopRef.current;

      if (snapToTopOnExpand) {
        const nextIsScrolled = resolveHeaderCompactOnScroll(
          scrollTop,
          lastScrollTop,
          isScrolledRef.current,
          threshold,
        );

        if (
          shouldSnapScrollToTopOnExpand(scrollTop, lastScrollTop, isScrolledRef.current, threshold)
        ) {
          isSnappingRef.current = true;
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          isScrolledRef.current = false;
          setIsScrolled(false);
          lastScrollTopRef.current = 0;

          requestAnimationFrame(() => {
            isSnappingRef.current = false;
          });

          return;
        }

        if (nextIsScrolled !== isScrolledRef.current) {
          isScrolledRef.current = nextIsScrolled;
          setIsScrolled(nextIsScrolled);
        }
      } else {
        const nextIsScrolled = scrollTop > threshold;

        if (nextIsScrolled !== isScrolledRef.current) {
          isScrolledRef.current = nextIsScrolled;
          setIsScrolled(nextIsScrolled);
        }
      }

      lastScrollTopRef.current = scrollTop;
    };

    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTopRef.current = initialScrollTop;
    isScrolledRef.current = initialScrollTop > threshold;
    setIsScrolled(isScrolledRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, snapToTopOnExpand]);

  return isScrolled;
}
