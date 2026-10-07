import nextPlugin from '@next/eslint-plugin-next';
import anyConfig from 'eslint-config-any';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...anyConfig.react,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'off',
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'dist/**', 'next-env.d.ts', 'parity-baseline/**'],
  },
  {
    files: ['**/*.md'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]);
