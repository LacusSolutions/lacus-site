import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { JsonLd } from './JsonLd';

const services = [
  { name: 'Web Development', description: 'Modern web apps.' },
  { name: 'Mobile Development', description: 'iOS and Android.' },
  { name: 'API Development', description: 'Scalable APIs.' },
];

describe('JsonLd', () => {
  it('renders a single JSON-LD graph script', () => {
    const { container } = render(
      <JsonLd
        locale="en"
        title="Lacus - Custom Software Development"
        description="Test description"
        tagline="We transform ideas into software"
        services={services}
      />,
    );
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    const graph = JSON.parse(scripts[0].textContent ?? '{}');
    expect(graph['@graph']).toHaveLength(4);
    expect(graph['@graph'][0]['@type']).toBe('Organization');
    expect(graph['@graph'][0].description).toBe('Test description');
  });
});
