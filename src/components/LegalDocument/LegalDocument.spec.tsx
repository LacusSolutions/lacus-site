import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import en from '~/i18n/locales/en.json';

import { LegalDocument } from './LegalDocument';

describe('LegalDocument', () => {
  it('renders privacy title and sections', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <LegalDocument namespace="privacy" />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '1. Who we are' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
  });
});
