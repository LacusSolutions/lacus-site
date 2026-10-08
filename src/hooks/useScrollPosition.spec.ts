import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useScrollPosition } from './useScrollPosition';

function setScrollTop(value: number): void {
  Object.defineProperty(document.documentElement, 'scrollTop', {
    configurable: true,
    value,
    writable: true,
  });
  Object.defineProperty(window, 'pageYOffset', {
    configurable: true,
    value,
    writable: true,
  });
}

describe('useScrollPosition', () => {
  beforeEach(() => {
    setScrollTop(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when scroll position is at or below threshold', () => {
    const { result } = renderHook(() => useScrollPosition(50));
    expect(result.current).toBe(false);
  });

  it('returns true when scrolling down past threshold', () => {
    const { result } = renderHook(() => useScrollPosition(50));

    act(() => {
      setScrollTop(51);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('removes scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition(50));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('stays expanded on a small scroll down from the top', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const { result } = renderHook(() => useScrollPosition(50, true));

    act(() => {
      setScrollTop(20);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('snaps scroll to top when scrolling up into the expand zone from compact state', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const { result } = renderHook(() => useScrollPosition(50, true));

    act(() => {
      setScrollTop(60);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);

    act(() => {
      setScrollTop(8);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
    expect(result.current).toBe(false);
  });
});
