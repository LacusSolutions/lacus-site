import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SonnerToaster, Toaster, TooltipProvider } from "@/components/ui";
import { WhatsAppButton } from "@/components";
import { Home, NotFound } from "@/pages";

export default function App() {
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
