import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from '@/components';
import { useScrollPosition } from '@/hooks';

export function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(50);

  const navItems = [
    { href: '#sobre', label: t('nav.about') },
    { href: '#servicos', label: t('nav.services') },
    { href: '#projetos', label: t('nav.projects') },
    { href: '#contato', label: t('nav.contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-500 ${
      isScrolled ? 'py-2' : 'py-4 md:py-8'
    }`}>
      <div className={`container mx-auto px-6 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-2 md:py-6'
      }`}>
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Logo Section - Full width when expanded */}
          <div className={`transition-all duration-500 ${
            isScrolled ? 'mb-0' : 'mb-6 text-center'
          }`}>
            <div className={`inline-flex items-center gap-4 transition-all duration-500 ${
              isScrolled ? 'justify-start' : 'justify-center'
            }`}>
              <img
                src="/lovable-uploads/12c27d29-c402-47e8-8e6d-563fe50445a5.png"
                alt="Lacus Logo"
                className={`transition-all duration-500 ${
                  isScrolled ? 'w-8 h-8' : 'w-16 h-16'
                }`}
              />
              <div className={`font-poppins font-bold text-primary transition-all duration-500 flex items-center ${
                isScrolled ? 'text-2xl h-8' : 'text-4xl h-16'
              }`}>
                Lacus
              </div>
            </div>
          </div>

          {/* Navigation and Language Switcher */}
          <div className={`flex items-center transition-all duration-500 ${
            isScrolled ? 'justify-between' : 'justify-center gap-16'
          }`}>
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <LanguageSwitcher isScrolled={isScrolled} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/12c27d29-c402-47e8-8e6d-563fe50445a5.png"
              alt="Lacus Logo"
              className="w-8 h-8"
            />
            <div className="font-poppins font-bold text-primary text-2xl h-8 flex items-center">
              Lacus
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-primary hover:text-primary/80 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
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
