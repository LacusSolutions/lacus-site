import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

import { Providers } from '~/components/Providers';
import '~/index.scss';
import { type Locale, routing } from '~/i18n/routing';
import { SITE_URL } from '~/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins-family',
  display: 'swap',
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): { locale: Locale }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<ReactNode> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const htmlLang = locale === 'pt' ? 'pt-BR' : 'en';

  return (
    <html lang={htmlLang} className={poppins.variable} suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
