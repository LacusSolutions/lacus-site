import { useEffect, useState } from 'react';

export function useScrollPosition(threshold = 100): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
