export function getExpandThreshold(shrinkThreshold: number): number {
  return Math.min(10, shrinkThreshold);
}

export function resolveHeaderCompactOnScroll(
  scrollTop: number,
  lastScrollTop: number,
  isScrolled: boolean,
  shrinkThreshold: number,
): boolean {
  const expandThreshold = getExpandThreshold(shrinkThreshold);
  const scrollingDown = scrollTop > lastScrollTop;
  const scrollingUp = scrollTop < lastScrollTop;

  if (scrollingDown) {
    if (scrollTop > shrinkThreshold) {
      return true;
    }

    return isScrolled;
  }

  if (scrollingUp) {
    if (scrollTop <= expandThreshold) {
      return false;
    }

    return isScrolled;
  }

  return isScrolled;
}

export function shouldSnapScrollToTopOnExpand(
  scrollTop: number,
  lastScrollTop: number,
  isScrolled: boolean,
  shrinkThreshold: number,
): boolean {
  const expandThreshold = getExpandThreshold(shrinkThreshold);
  const scrollingUp = scrollTop < lastScrollTop;

  return scrollingUp && isScrolled && scrollTop > 0 && scrollTop <= expandThreshold;
}
