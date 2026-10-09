import { describe, expect, it } from 'vitest';

import {
  getExpandThreshold,
  resolveHeaderCompactOnScroll,
  shouldSnapScrollToTopOnExpand,
} from './useScrollPosition.utils';

describe('resolveHeaderCompactOnScroll', () => {
  it('shrinks only when scrolling down past the shrink threshold', () => {
    expect(resolveHeaderCompactOnScroll(60, 40, false, 50)).toBe(true);
    expect(resolveHeaderCompactOnScroll(30, 0, false, 50)).toBe(false);
  });

  it('does not grow when scrolling down inside the shrink threshold', () => {
    expect(resolveHeaderCompactOnScroll(45, 51, true, 50)).toBe(true);
  });

  it('grows only when scrolling up into the expand threshold', () => {
    expect(resolveHeaderCompactOnScroll(8, 20, true, 50)).toBe(false);
    expect(resolveHeaderCompactOnScroll(25, 40, true, 50)).toBe(true);
  });

  it('does not shrink when scrolling up above the expand threshold', () => {
    expect(resolveHeaderCompactOnScroll(40, 60, true, 50)).toBe(true);
  });
});

describe('shouldSnapScrollToTopOnExpand', () => {
  it('snaps only when scrolling up into the expand zone from compact state', () => {
    expect(shouldSnapScrollToTopOnExpand(5, 20, true, 50)).toBe(true);
    expect(shouldSnapScrollToTopOnExpand(40, 60, true, 50)).toBe(false);
    expect(shouldSnapScrollToTopOnExpand(5, 20, false, 50)).toBe(false);
  });
});

describe('getExpandThreshold', () => {
  it('caps expand threshold at 10px', () => {
    expect(getExpandThreshold(50)).toBe(10);
    expect(getExpandThreshold(8)).toBe(8);
  });
});
