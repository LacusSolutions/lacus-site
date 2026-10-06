import anyConfig from 'eslint-config-any';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...anyConfig.react,
  {
    files: ['**/*.md'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
]);
