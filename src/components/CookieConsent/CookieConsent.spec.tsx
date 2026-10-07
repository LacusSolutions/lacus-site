import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import en from '~/i18n/locales/en.json';

import { CookieConsent } from './CookieConsent';
import { CookieConsentProvider } from './CookieConsent.context';
import { COOKIE_CONSENT_STORAGE_KEY } from './CookieConsent.utils';

function renderBanner(): ReturnType<typeof render> {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <CookieConsentProvider>
        <CookieConsent />
      </CookieConsentProvider>
    </NextIntlClientProvider>,
  );
}

describe('CookieConsent', () => {
  it('shows the banner until the user chooses an option', async () => {
    localStorage.clear();

    renderBanner();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('We use cookies')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    expect(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toBe('accepted');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stores rejection when the user declines optional cookies', async () => {
    localStorage.clear();

    renderBanner();

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reject non-essential' }));

    expect(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toBe('rejected');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
