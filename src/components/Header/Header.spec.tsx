import { cleanup, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { type ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import en from '~/i18n/locales/en.json';

const useScrollPositionMock = vi.fn((_threshold?: number) => false);

vi.mock('~/hooks', () => ({
  useScrollPosition: (threshold?: number) => useScrollPositionMock(threshold),
}));

vi.mock('next/image', () => ({
  default: ({
    alt,
    className,
    src,
  }: {
    alt: string;
    className?: string;
    src: string;
  }): ReactNode => <img alt={alt} className={className} src={src} />,
}));

vi.mock('~/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
    href: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

import { Header } from './Header';

function renderHeader(): ReturnType<typeof render> {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <Header />
    </NextIntlClientProvider>,
  );
}

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useScrollPositionMock.mockReturnValue(false);
  });

  it('renders desktop row with logo, nav links, and language switcher', () => {
    renderHeader();

    const row = screen.getByTestId('header-desktop-row');
    expect(within(row).getByAltText(en.a11y.logo_alt)).toBeInTheDocument();
    expect(within(row).getByRole('link', { name: en.nav.about })).toBeInTheDocument();
    expect(within(row).getByRole('button', { name: /English/i })).toBeInTheDocument();
  });

  it('applies expanded header surface when not scrolled', () => {
    renderHeader();

    const header = screen.getByRole('banner');
    const row = screen.getByTestId('header-desktop-row');
    expect(header).toHaveAttribute('data-scrolled', 'false');
    expect(header.className).toContain('bg-background');
    expect(header.className).not.toContain('backdrop-blur-md');
    expect(within(row).getByAltText(en.a11y.logo_alt)).toHaveClass('w-16');
    expect(within(row).getByRole('link', { name: en.nav.about }).className).toContain('text-lg');
  });

  it('applies compact glass surface when scrolled', () => {
    useScrollPositionMock.mockReturnValue(true);
    renderHeader();

    const header = screen.getByRole('banner');
    const row = screen.getByTestId('header-desktop-row');
    expect(header).toHaveAttribute('data-scrolled', 'true');
    expect(header.className).not.toContain('backdrop-blur-md');
    expect(within(row).getByAltText(en.a11y.logo_alt)).toHaveClass('w-8');
    expect(within(row).getByRole('link', { name: en.nav.about }).className).toContain('text-base');
    expect(within(row).getByRole('link', { name: en.nav.about }).className).not.toContain(
      'text-sm',
    );
    const languageTrigger = within(row).getByRole('button', { name: 'English' });
    expect(languageTrigger.querySelector('img[src="/flags/us.svg"]')).toBeInTheDocument();
    expect(within(row).getByRole('navigation').className).toContain('justify-end');
  });

  it('centers navigation when expanded', () => {
    renderHeader();

    const row = screen.getByTestId('header-desktop-row');
    expect(within(row).getByRole('navigation').className).toContain('justify-center');
  });

  it('renders mobile menu toggle', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: en.nav.open_menu })).toBeInTheDocument();
  });

  it('keeps a compact static header shell on mobile viewports', () => {
    renderHeader();

    const header = screen.getByRole('banner');
    expect(header.className).toContain('sticky');
    expect(header.className).toContain('max-md:py-2');
    expect(header.className).not.toContain('fixed');
    expect(header.className).toContain('max-md:transition-none');
  });
});
