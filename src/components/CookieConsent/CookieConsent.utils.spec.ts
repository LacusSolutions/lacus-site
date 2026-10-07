import { afterEach, describe, expect, it } from 'vitest';

import {
  clearCookieConsent,
  COOKIE_CONSENT_STORAGE_KEY,
  readCookieConsent,
  writeCookieConsent,
} from './CookieConsent.utils';

describe('CookieConsent.utils', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('returns null when consent was not stored', () => {
    expect(readCookieConsent()).toBeNull();
  });

  it('persists accepted and rejected choices', () => {
    writeCookieConsent('accepted');
    expect(readCookieConsent()).toBe('accepted');

    writeCookieConsent('rejected');
    expect(readCookieConsent()).toBe('rejected');
  });

  it('clears stored consent', () => {
    writeCookieConsent('accepted');
    clearCookieConsent();
    expect(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toBeNull();
    expect(readCookieConsent()).toBeNull();
  });
});
