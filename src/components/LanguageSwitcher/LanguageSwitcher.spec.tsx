import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

import en from '~/i18n/locales/en.json';

vi.mock('~/i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('shows the current locale label when expanded', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <LanguageSwitcher isScrolled={false} />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('button', { name: /English/i })).toBeInTheDocument();
  });
});
