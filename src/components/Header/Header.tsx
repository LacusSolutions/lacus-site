'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type ReactNode, useEffect, useId, useState } from 'react';

import { LanguageSwitcher } from '~/components';
import { useScrollPosition } from '~/hooks';
import { Link } from '~/i18n/navigation';

const navLinkClassName =
  'text-primary hover:text-primary/80 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export function Header(): ReactNode {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(50);
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
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4 md:py-8'
      }`}
    >
      <div
        className={`container mx-auto px-6 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-2 md:py-6'
        }`}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Logo Section - Full width when expanded */}
          <div
            className={`transition-all duration-500 ${isScrolled ? 'mb-0' : 'mb-6 text-center'}`}
          >
            <div
              className={`inline-flex items-center gap-4 transition-all duration-500 ${
                isScrolled ? 'justify-start' : 'justify-center'
              }`}
            >
              <Image
                src="/brand/logo.png"
                alt={t('a11y.logo_alt')}
                width={64}
                height={64}
                className={`transition-all duration-500 ${isScrolled ? 'w-8 h-8' : 'w-16 h-16'}`}
                priority
              />
              <div
                className={`font-poppins font-bold text-primary transition-all duration-500 flex items-center ${
                  isScrolled ? 'text-2xl h-8' : 'text-4xl h-16'
                }`}
              >
                Lacus
              </div>
            </div>
          </div>

          {/* Navigation and Language Switcher */}
          <div
            className={`flex items-center transition-all duration-500 ${
              isScrolled ? 'justify-between' : 'justify-center gap-16'
            }`}
          >
            <nav className="flex items-center space-x-8" aria-label={t('nav.primary_label')}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClassName}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <LanguageSwitcher isScrolled={isScrolled} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt={t('a11y.logo_alt')}
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <div className="font-poppins font-bold text-primary text-2xl h-8 flex items-center">
              Lacus
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            className="md:hidden mt-4 pb-4 border-t border-border pt-4"
            aria-label={t('nav.mobile_label')}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
