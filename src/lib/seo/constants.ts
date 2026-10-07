import { SITE_URL } from '~/lib/site';

export const SITE_NAME = 'Lacus';

export const OG_IMAGE_PATH = '/og/og-image.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = 'image/png';

export const LOGO_PATH = '/brand/logo.png';

/**
 * Placeholder until footer social links use real URLs.
 */
export const SAME_AS: string[] = [];

export const MANIFEST_PATH = '/manifest.webmanifest';

export const THEME_COLOR = '#0f172a';

export function getOgImageUrl(): string {
  return `${SITE_URL}${OG_IMAGE_PATH}`;
}
