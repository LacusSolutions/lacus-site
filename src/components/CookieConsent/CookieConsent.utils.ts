export const COOKIE_CONSENT_STORAGE_KEY = 'lacus-cookie-consent';

export const COOKIE_CONSENT_CHANGE_EVENT = 'lacus-cookie-consent-change';

export type CookieConsentStatus = 'accepted' | 'rejected';

export function readCookieConsent(): CookieConsentStatus | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (value === 'accepted' || value === 'rejected') {
    return value;
  }

  return null;
}

function notifyCookieConsentChange(): void {
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
}

export function subscribeCookieConsent(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onStoreChange);

  return (): void => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onStoreChange);
  };
}

export function writeCookieConsent(status: CookieConsentStatus): void {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);
  notifyCookieConsentChange();
}

export function clearCookieConsent(): void {
  localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  notifyCookieConsentChange();
}
