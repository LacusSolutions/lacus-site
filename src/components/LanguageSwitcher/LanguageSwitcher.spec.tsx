import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { type ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import en from '~/i18n/locales/en.json';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }): ReactNode => <img alt={alt} src={src} />,
}));

vi.mock('~/i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the current locale label when expanded', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <LanguageSwitcher isScrolled={false} />
      </NextIntlClientProvider>,
    );
    const trigger = screen.getByRole('button', { name: /English/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger.querySelector('img[src="/flags/us.svg"]')).toBeInTheDocument();
  });

  it('centers the dropdown when menuAlign is center', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <LanguageSwitcher menuAlign="center" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('button', { name: /English/i })).toBeInTheDocument();
  });

  it('shows the locale flag when compact', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <LanguageSwitcher isScrolled />
      </NextIntlClientProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'English' });
    expect(trigger.querySelector('img[src="/flags/us.svg"]')).toBeInTheDocument();
  });
});
