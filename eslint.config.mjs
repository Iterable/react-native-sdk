import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['coverage/**', 'docs/**', 'lib/**', 'node_modules/**'],
  },
  ...compat.extends(
    '@react-native',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier'
  ),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  ...compat.config({
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: ['@typescript-eslint', 'tsdoc'],
        extends: [
          'plugin:@typescript-eslint/recommended',
          // We need more verbose typing to enable the below rule, but we should
          // do this in the future.
          // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: true,
          tsconfigRootDir: __dirname,
        },
        rules: {
          '@typescript-eslint/no-var-requires': [
            'error',
            { allow: ['/package\\.json$'] },
          ],
          '@typescript-eslint/no-require-imports': [
            'error',
            { allow: ['/package\\.json$'] },
          ],
          'tsdoc/syntax': 'warn',
        },
      },
    ],
  }),
  ...compat.config({
    overrides: [
      {
        files: ['**/*.test.{js,ts,tsx}', '**/__mocks__/*', '**/__tests__/*'],
        plugins: ['jest'],
        env: {
          jest: true,
        },
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
          '@typescript-eslint/no-require-imports': 'off',
        },
      },
    ],
  }),
];
