import { useEffect, useState } from 'react';

export function useHeaderHeight(): number {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = (): void => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on scroll to account for header size changes
    const handleScroll = (): void => {
      updateHeaderHeight();
    };

    // Update on resize
    const handleResize = (): void => {
      updateHeaderHeight();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Use MutationObserver to detect changes in header structure
    const header = document.querySelector('header');
    let observer: MutationObserver | null = null;

    if (header) {
      observer = new MutationObserver(updateHeaderHeight);
      observer.observe(header, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['class', 'style'],
      });
    }

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return headerHeight;
}
