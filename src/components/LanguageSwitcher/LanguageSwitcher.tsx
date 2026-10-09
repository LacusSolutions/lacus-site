'use client';

import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { type ReactNode, useState } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui';
import { usePathname, useRouter } from '~/i18n/navigation';

import { Flag } from './Flag';
import { LANGUAGE_OPTIONS, type LanguageCode } from './LanguageSwitcher.utils';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  menuAlign?: 'center' | 'end';
}

export function LanguageSwitcher({
  isScrolled = false,
  menuAlign = 'end',
}: LanguageSwitcherProps): ReactNode {
  const locale = useLocale() as LanguageCode;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    LANGUAGE_OPTIONS.find((language) => language.code === locale) || LANGUAGE_OPTIONS[0];

  function handleLanguageChange(languageCode: string): void {
    router.replace(pathname, { locale: languageCode });
    setIsOpen(false);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={isScrolled ? 'sm' : 'default'}
          aria-label={isScrolled ? currentLanguage.name : undefined}
          className={`flex items-center gap-2 text-foreground hover:text-primary transition-colors ${
            isScrolled ? '' : 'h-10 px-3 text-base'
          }`}
        >
          <Flag code={currentLanguage.code} size="sm" decorative />
          {!isScrolled && (
            <span className="transition-all duration-500">{currentLanguage.name}</span>
          )}
          <ChevronDown
            size={isScrolled ? 14 : 16}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={menuAlign}
        className="w-40 bg-background border border-border shadow-lg z-50"
      >
        {LANGUAGE_OPTIONS.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer hover:bg-accent/50 ${
              locale === language.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <Flag code={language.code} size="md" decorative />
            <span className="text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
