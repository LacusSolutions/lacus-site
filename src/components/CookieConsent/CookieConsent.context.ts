'use client';

import {
  createContext,
  createElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

import {
  clearCookieConsent,
  type CookieConsentStatus,
  readCookieConsent,
  subscribeCookieConsent,
  writeCookieConsent,
} from './CookieConsent.utils';

interface CookieConsentContextValue {
  accept: () => void;
  analyticsEnabled: boolean;
  reject: () => void;
  reopenPreferences: () => void;
  showBanner: boolean;
  status: CookieConsentStatus | null;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function getServerCookieConsentSnapshot(): CookieConsentStatus | null {
  return null;
}

export function CookieConsentProvider({ children }: { children: ReactNode }): ReactNode {
  const status = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    getServerCookieConsentSnapshot,
  );

  const accept = useCallback(() => {
    writeCookieConsent('accepted');
  }, []);

  const reject = useCallback(() => {
    writeCookieConsent('rejected');
  }, []);

  const reopenPreferences = useCallback(() => {
    clearCookieConsent();
  }, []);

  const value = useMemo(
    (): CookieConsentContextValue => ({
      accept,
      analyticsEnabled: status === 'accepted',
      reject,
      reopenPreferences,
      showBanner: status === null,
      status,
    }),
    [accept, reject, reopenPreferences, status],
  );

  return createElement(CookieConsentContext.Provider, { value }, children);
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }

  return context;
}
