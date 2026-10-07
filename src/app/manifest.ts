import type { MetadataRoute } from 'next';

import { LOGO_PATH, SITE_NAME, THEME_COLOR } from '~/lib/seo/constants';
import { SITE_URL } from '~/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Custom Software Development`,
    short_name: SITE_NAME,
    description:
      'We transform ideas into innovative technology solutions. Custom software development for businesses.',
    start_url: `${SITE_URL}/en/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: THEME_COLOR,
    lang: 'en',
    icons: [
      {
        src: LOGO_PATH,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: LOGO_PATH,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
