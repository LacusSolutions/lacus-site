import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

import en from '~/i18n/locales/en.json';

vi.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('~/hooks/useHeaderHeight', () => ({
  useHeaderHeight: () => 80,
}));

import { Home } from './Home';

describe('Home', () => {
  it('renders the hero heading from translations', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <Home />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/We Transform/i);
  });
});
