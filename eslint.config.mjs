import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';
import tsdoc from 'eslint-plugin-tsdoc';
import jest from 'eslint-plugin-jest';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  // Base configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: fixupConfigRules(compat.extends('@react-native', 'plugin:react/recommended', 'plugin:react-native/all', 'prettier')),
    plugins: {
      prettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
  },
  // TypeScript-specific configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'tsdoc': tsdoc,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
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
  // Jest/test configuration
  {
    files: ['**/*.test.{js,ts,tsx}', '**/__mocks__/*', '**/__tests__/*'],
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Global ignores
  {
    ignores: ['node_modules/', 'lib/', 'docs/', 'coverage/', '.history/'],
  },
]);
