import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type ReactNode } from 'react';

import { cn } from '~/lib/utils';

import { LANGUAGE_FLAG_SRC, type LanguageCode } from '../LanguageSwitcher.utils';

export interface FlagProps {
  className?: string;
  code: LanguageCode;
  decorative?: boolean;
  size?: 'md' | 'sm';
}

/**
 * 4:3 — matches `public/flags/*.svg` (flag-icons 4x3 assets).
 */
const FLAG_DIMENSIONS = {
  sm: { width: 18, height: 14 },
  md: { width: 24, height: 18 },
} as const;

export function Flag({ code, className, decorative = false, size = 'sm' }: FlagProps): ReactNode {
  const t = useTranslations('language_switcher');
  const { width, height } = FLAG_DIMENSIONS[size];

  return (
    <Image
      src={LANGUAGE_FLAG_SRC[code]}
      alt={decorative ? '' : t(`flag_${code}_alt`)}
      aria-hidden={decorative ? true : undefined}
      width={width}
      height={height}
      className={cn('shrink-0 rounded-md border border-border/40 object-contain', className)}
    />
  );
}
