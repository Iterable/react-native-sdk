module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/src/__mocks__/jest.setup.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/@testing-library/jest-native/extend-expect',
  ],
  testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-gesture-handler|react-native-webview|react-native-vector-icons)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{cjs,js,jsx,mjs,ts,tsx}',
    '!src/**/*.test.{cjs,js,jsx,mjs,mdx,ts,tsx}',
    '!src/(__tests__|__mocks__)/*',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
};
