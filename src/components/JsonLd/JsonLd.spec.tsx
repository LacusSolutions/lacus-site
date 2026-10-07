import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('renders Organization and WebSite structured data scripts', () => {
    const { container } = render(<JsonLd description="Test description" />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(2);
    const org = JSON.parse(scripts[0].textContent ?? '{}');
    expect(org['@type']).toBe('Organization');
    expect(org.description).toBe('Test description');
  });
});
