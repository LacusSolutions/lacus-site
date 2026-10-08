'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type ReactNode, useEffect, useId, useState } from 'react';

import { LanguageSwitcher } from '~/components';
import { useScrollPosition } from '~/hooks';
import { Link } from '~/i18n/navigation';
import { cn } from '~/lib/utils';

import {
  getDesktopNavClasses,
  getHeaderRootClasses,
  getMobileNavLinkClasses,
  getNavLinkClasses,
  HEADER_DESKTOP_TRANSITION_CLASS,
  HEADER_MOBILE_STATIC_CLASS,
  HEADER_POSITION_CLASS,
} from './Header.utils';

export function Header(): ReactNode {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(50, true);
  const mobileNavId = useId();

  const navItems = [
    { href: '/#sobre', label: t('nav.about') },
    { href: '/#servicos', label: t('nav.services') },
    { href: '/#projetos', label: t('nav.projects') },
    { href: '/#contato', label: t('nav.contact') },
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      data-scrolled={isScrolled ? 'true' : 'false'}
      className={cn('z-50', HEADER_POSITION_CLASS, getHeaderRootClasses(isScrolled))}
    >
      <div
        className={cn(
          'container mx-auto px-6',
          HEADER_MOBILE_STATIC_CLASS,
          HEADER_DESKTOP_TRANSITION_CLASS,
        )}
      >
        {/* Desktop Layout */}
        <div
          className="hidden md:flex md:items-center md:gap-x-8 lg:gap-x-12"
          data-testid="header-desktop-row"
        >
          <div
            className={cn(
              'inline-flex shrink-0 items-center gap-4',
              HEADER_DESKTOP_TRANSITION_CLASS,
            )}
          >
            <Image
              src="/brand/logo.png"
              alt={t('a11y.logo_alt')}
              width={64}
              height={64}
              className={cn(HEADER_DESKTOP_TRANSITION_CLASS, isScrolled ? 'h-8 w-8' : 'h-16 w-16')}
              priority
            />
            <div
              className={cn(
                'flex items-center font-poppins font-bold text-primary',
                HEADER_DESKTOP_TRANSITION_CLASS,
                isScrolled ? 'h-8 text-2xl' : 'h-16 text-4xl',
              )}
            >
              Lacus
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <nav className={getDesktopNavClasses(isScrolled)} aria-label={t('nav.primary_label')}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={getNavLinkClasses(isScrolled)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="shrink-0">
            <LanguageSwitcher isScrolled={isScrolled} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex items-center justify-between md:hidden">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt={t('a11y.logo_alt')}
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <div className="flex h-8 items-center font-poppins text-xl font-bold text-primary">
              Lacus
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.close_menu') : t('nav.open_menu')}
            aria-expanded={isMenuOpen}
            aria-controls={mobileNavId}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id={mobileNavId}
            className="mt-4 border-t border-border pt-4 pb-4 md:hidden"
            aria-label={t('nav.mobile_label')}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getMobileNavLinkClasses()}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex justify-center pt-2">
                <LanguageSwitcher menuAlign="center" />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
