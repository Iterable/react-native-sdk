module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
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
        ecmaVersion: 2018,
        sourceType: 'module',
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
