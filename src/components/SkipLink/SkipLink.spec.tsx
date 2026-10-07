import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import { SkipLink } from './SkipLink';

const messages = {
  a11y: {
    skip_to_main: 'Skip to main content',
  },
};

describe('SkipLink', () => {
  it('links to main content with accessible label', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SkipLink />
      </NextIntlClientProvider>,
    );

    const link = screen.getByRole('link', { name: 'Skip to main content' });
    expect(link).toHaveAttribute('href', '#main-content');
  });
});
