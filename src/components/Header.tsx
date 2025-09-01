import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const Header = () => {
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
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4 md:py-6'
    }`}>
      <div className={`container mx-auto px-6 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-2 md:py-4'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/12c27d29-c402-47e8-8e6d-563fe50445a5.png" 
              alt="Lacus Logo" 
              className={`transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'
              }`} 
            />
            <div className={`font-poppins font-bold text-primary transition-all duration-300 ${
              isScrolled ? 'text-2xl' : 'text-2xl md:text-3xl'
            }`}>
              Lacus
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" asChild>
              <a href="#contato">{t('nav.talk_to_us')}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
                  className="text-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <Button variant="outline" asChild className="w-fit">
                  <a href="#contato">{t('nav.talk_to_us')}</a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;