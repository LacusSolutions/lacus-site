import { describe, expect, it } from 'vitest';

import { buildJsonLdGraph } from './JsonLd.utils';

describe('buildJsonLdGraph', () => {
  it('includes localized WebPage canonical URL', () => {
    const graph = buildJsonLdGraph({
      locale: 'pt',
      title: 'Título',
      description: 'Descrição',
      tagline: 'Tagline',
      services: [{ name: 'Web', description: 'Desc' }],
    });

    const webPage = (graph['@graph'] as { '@type': string; url: string }[]).find(
      (node) => node['@type'] === 'WebPage',
    );
    expect(webPage?.url).toBe('https://www.lacus.solutions/pt/');
  });
});
