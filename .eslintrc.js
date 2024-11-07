module.exports = {
  root: true,
  plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
  extends: ['@react-native', 'prettier', 'plugin:@typescript-eslint/recommended'],
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
    '@typescript-eslint/no-var-requires': ['error', { allow: ['/package\\.json$'] }],
    '@typescript-eslint/no-require-imports': ['error', { allow: ['/package\\.json$'] }],
  },
  overrides: [
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
