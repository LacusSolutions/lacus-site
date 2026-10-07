'use client';

import { type ReactNode } from 'react';

import { WhatsAppButton } from '~/components';
import {
  ConditionalAnalytics,
  CookieConsent,
  CookieConsentProvider,
} from '~/components/CookieConsent';
import { Toaster, TooltipProvider } from '~/components/ui';

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <CookieConsentProvider>
      <TooltipProvider>
        {children}
        <Toaster />
        <WhatsAppButton />
        <ConditionalAnalytics />
        <CookieConsent />
      </TooltipProvider>
    </CookieConsentProvider>
  );
}
