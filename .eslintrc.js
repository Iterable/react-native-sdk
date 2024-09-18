module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'airbnb/hooks',
    '@react-native',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'react-native'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
