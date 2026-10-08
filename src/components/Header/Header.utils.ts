const NAV_LINK_BASE =
  'text-primary hover:text-primary/80 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export const HEADER_POSITION_CLASS = 'sticky top-0 left-0 right-0';

export const HEADER_MOBILE_STATIC_CLASS = 'max-md:py-2 max-md:transition-none';

export const HEADER_DESKTOP_TRANSITION_CLASS =
  'md:transition-all md:duration-500 md:motion-reduce:transition-none';

/**
 * @deprecated Use HEADER_DESKTOP_TRANSITION_CLASS on desktop-only nodes.
 */
export const HEADER_TRANSITION_CLASS = HEADER_DESKTOP_TRANSITION_CLASS;

export function getHeaderRootClasses(isScrolled: boolean): string {
  const surface = 'bg-background border-b border-border';

  if (isScrolled) {
    return `${HEADER_MOBILE_STATIC_CLASS} ${HEADER_DESKTOP_TRANSITION_CLASS} py-2 ${surface}`;
  }

  return `${HEADER_MOBILE_STATIC_CLASS} ${HEADER_DESKTOP_TRANSITION_CLASS} py-2 md:py-6 md:py-8 ${surface}`;
}

export function getMobileNavLinkClasses(): string {
  return `${NAV_LINK_BASE} text-base`;
}

export function getNavLinkClasses(isScrolled: boolean): string {
  const size = isScrolled ? 'text-base' : 'text-base md:text-lg';
  const sizeTransition = 'transition-[font-size] duration-500 motion-reduce:transition-none';

  return `${NAV_LINK_BASE} ${size} ${sizeTransition}`;
}

export function getDesktopNavClasses(isScrolled: boolean): string {
  const base = 'flex w-full items-center gap-x-8';

  if (isScrolled) {
    return `${base} ml-auto justify-end`;
  }

  return `${base} mx-auto justify-center`;
}
