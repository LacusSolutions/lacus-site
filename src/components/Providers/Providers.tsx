'use client';

import { Analytics } from '@vercel/analytics/react';
import { type ReactNode } from 'react';

import { WhatsAppButton } from '~/components';
import { Toaster, TooltipProvider } from '~/components/ui';

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
      <WhatsAppButton />
      <Analytics />
    </TooltipProvider>
  );
}
