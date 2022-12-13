module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'airbnb/hooks'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
