'use client';

import { Analytics } from '@vercel/analytics/react';
import { type ReactNode } from 'react';

import { useCookieConsent } from './CookieConsent.context';

export function ConditionalAnalytics(): ReactNode {
  const { analyticsEnabled } = useCookieConsent();

  if (!analyticsEnabled) {
    return null;
  }

  return <Analytics />;
}
