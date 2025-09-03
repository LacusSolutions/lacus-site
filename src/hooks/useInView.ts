import { type RefObject, useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}): {
  isInView: boolean;
  ref: RefObject<HTMLDivElement>;
} {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return (): void => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref,
    isInView,
  };
}
