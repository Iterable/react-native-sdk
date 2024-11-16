module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
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
      },
    },
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
};
