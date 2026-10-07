export const SITE_URL = 'https://www.lacus.solutions';

export const SITE_SOCIAL = {
  github: 'https://github.com/LacusSolutions',
  linkedin: 'https://linkedin.com/juliolmuller',
} as const;

export const SITE_SAME_AS = [SITE_SOCIAL.github, SITE_SOCIAL.linkedin] as const;

export const SITE_CONTACT = {
  email: 'contact@lacus.solutions',
  phoneDisplay: '+55 (41) 98518-7730',
  phoneTel: '+5541985187730',
  whatsappTel: '5541985187730',
} as const;

export function getWhatsAppUrl(): string {
  return `https://wa.me/${SITE_CONTACT.whatsappTel}`;
}
