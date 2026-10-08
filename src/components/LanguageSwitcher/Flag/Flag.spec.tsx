import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { type ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import en from '~/i18n/locales/en.json';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }): ReactNode => <img alt={alt} src={src} />,
}));

import { Flag } from './Flag';

describe('Flag', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the United States flag image for English', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <Flag code="en" />
      </NextIntlClientProvider>,
    );

    const image = screen.getByRole('img', { name: en.language_switcher.flag_en_alt });
    expect(image).toHaveAttribute('src', '/flags/us.svg');
  });
});
