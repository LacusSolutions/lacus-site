import { type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { WhatsAppButton } from '~/components';
import { SonnerToaster, Toaster, TooltipProvider } from '~/components/ui';
import { Home, NotFound } from '~/pages';

export default function App(): ReactNode {
  return (
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  );
}
