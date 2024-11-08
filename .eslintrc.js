// const tsPlugin = require('@typescript-eslint/eslint-plugin');
// const tsEslint = require('typescript-eslint');

module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'jest'],
  // plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
  extends: ['@react-native', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
        // or `project: true` in typescript-eslint version >= 5.52.0
      },
      rules: {
        '@typescript-eslint/no-var-requires': ['error', { allow: ['/package\\.json$'] }],
        '@typescript-eslint/no-require-imports': ['error', { allow: ['/package\\.json$'] }],
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/__mocks__/*', '**/__tests__/*'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
