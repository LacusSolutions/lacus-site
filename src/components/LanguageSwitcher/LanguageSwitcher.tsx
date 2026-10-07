'use client';

import { ChevronDown, Globe } from 'lucide-react';
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

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps): ReactNode {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷', short: 'BR' },
    { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  function handleLanguageChange(languageCode: string): void {
    router.replace(pathname, { locale: languageCode });
    setIsOpen(false);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <Globe size={16} />
          <span className="transition-all duration-500">
            {isScrolled ? currentLanguage.short : currentLanguage.name}
          </span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-background border border-border shadow-lg z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer hover:bg-accent/50 ${
              locale === language.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
