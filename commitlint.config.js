export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'feat',
        'fix',
        'test',
        'refactor',
        'style',
        'docs',
        'ci',
        'build',
        'perf',
        'revert',
        'ai',
      ],
    ],
  },
};
