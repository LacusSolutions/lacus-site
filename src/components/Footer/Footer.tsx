'use client';

import { Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type ReactNode } from 'react';

import { GithubIcon, LinkedinIcon } from '~/components/icons';
import { Link } from '~/i18n/navigation';
import { SITE_CONTACT, SITE_SOCIAL } from '~/lib/site';

export function Footer(): ReactNode {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: GithubIcon,
      href: SITE_SOCIAL.github,
      label: t('footer.social_github'),
      external: true,
    },
    {
      icon: LinkedinIcon,
      href: SITE_SOCIAL.linkedin,
      label: t('footer.social_linkedin'),
      external: true,
    },
    { icon: Mail, href: `mailto:${SITE_CONTACT.email}`, label: t('footer.social_email') },
    { icon: Phone, href: `tel:${SITE_CONTACT.phoneTel}`, label: t('footer.social_phone') },
  ];

  const quickLinks = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.about'), href: '#sobre' },
    { label: t('nav.services'), href: '#servicos' },
    { label: t('nav.projects'), href: '#projetos' },
    { label: t('nav.contact'), href: '#contato' },
  ];

  const services = t.raw('footer.services_list') as string[];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/brand/logo.png"
                  alt={t('a11y.logo_alt')}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div className="text-3xl font-poppins font-bold text-primary">Lacus</div>
              </div>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>

              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    {...(social.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : undefined)}
                    className="bg-secondary-foreground/10 p-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">{t('footer.quick_links')}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">{t('footer.services_title')}</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-secondary-foreground/80 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-secondary-foreground/60 text-sm">
                <strong>Lacus Solutions</strong> &copy; {currentYear} • {t('footer.copyright')}
              </p>

              <div className="flex gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
                <Link
                  href="/terms"
                  className="text-secondary-foreground/60 hover:text-primary transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
