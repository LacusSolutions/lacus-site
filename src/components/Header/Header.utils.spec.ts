import { describe, expect, it } from 'vitest';

import { getDesktopNavClasses, getHeaderRootClasses, getNavLinkClasses } from './Header.utils';

describe('getHeaderRootClasses', () => {
  it('returns expanded surface classes when not scrolled', () => {
    const classes = getHeaderRootClasses(false);
    expect(classes).toContain('bg-background');
    expect(classes).not.toContain('backdrop-blur-md');
    expect(classes).toContain('md:py-6');
    expect(classes).toContain('max-md:py-2');
    expect(classes).toContain('max-md:transition-none');
  });

  it('returns compact solid surface classes when scrolled', () => {
    const classes = getHeaderRootClasses(true);
    expect(classes).toContain('bg-background');
    expect(classes).not.toContain('backdrop-blur-md');
    expect(classes).not.toContain('bg-background/80');
    expect(classes).toContain('py-2');
  });
});

describe('getDesktopNavClasses', () => {
  it('centers navigation when expanded', () => {
    const classes = getDesktopNavClasses(false);
    expect(classes).toContain('justify-center');
    expect(classes).toContain('mx-auto');
  });

  it('aligns navigation to the right when compact', () => {
    const classes = getDesktopNavClasses(true);
    expect(classes).toContain('justify-end');
    expect(classes).toContain('ml-auto');
  });
});

describe('getNavLinkClasses', () => {
  it('uses larger typography when expanded', () => {
    expect(getNavLinkClasses(false)).toContain('text-lg');
  });

  it('uses a moderate compact size between text-sm and expanded', () => {
    expect(getNavLinkClasses(true)).toContain('text-base');
    expect(getNavLinkClasses(true)).not.toContain('text-sm');
    expect(getNavLinkClasses(true)).not.toContain('text-lg');
  });

  it('animates font size with the header timing', () => {
    expect(getNavLinkClasses(true)).toContain('duration-500');
  });
});
