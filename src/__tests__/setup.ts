import { createElement, type ReactNode } from 'react';
import { vi } from 'vitest';

import '@testing-library/jest-dom/vitest';

vi.mock('~/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { children?: ReactNode; href: string }): ReactNode =>
    createElement('a', { href, ...props }, children),
}));
