import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import { CookieConsentProvider } from '~/components/CookieConsent';
import en from '~/i18n/locales/en.json';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders quick links from translations', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <CookieConsentProvider>
          <Footer />
        </CookieConsentProvider>
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
});
